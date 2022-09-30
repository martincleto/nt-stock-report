import { LitElement, html, css } from 'lit';
import { connect } from 'pwa-helpers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { property } from 'lit/decorators.js';

import { AppStockReport } from '@apptypes';
import { getProducts } from '@infrastructure/state/slices/report';
import { RootState, store } from '@infrastructure/state/store';

import '@ui/components/atoms/LoadingSpinner';

// const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;

export class AppBootstrap extends connect(store)(LitElement) {
  @property({ type: String }) title = 'Top Stockout Review';
  @property({ type: Array }) products: AppStockReport.Product[] = [];

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--app-stock-report-background-color);
    }

    main {
      flex-grow: 1;
    }

    .logo {
      margin-top: 64px;
      animation: app-logo-spin infinite 20s linear;
    }

    @keyframes app-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    store.dispatch(getProducts());
  }

  stateChanged(state: RootState) {
    const { products } = state.report;
    this.products = products;
  }

  render() {
    return html`
      <main>
        ${this.products.length > 0
          ? html`
              <h1>${this.title}</h1>
              <button>Click me</button>
            `
          : html` <loading-spinner role="progressbar"></loading-spinner> `}
      </main>
    `;
  }
}
