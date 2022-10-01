import { LitElement, html, css } from 'lit';
import { connect } from 'pwa-helpers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { property } from 'lit/decorators.js';

import { AppStockReport } from '@apptypes';
import { getProducts } from '@infrastructure/state/slices/report';
import { RootState, store } from '@infrastructure/state/store';

import '@ui/components/atoms/LoadingSpinner';
import '@ui/components/atoms/TextElement';
import '@ui/components/organisms/ProductCard';

// const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;
export class AppBootstrap extends connect(store)(LitElement) {
  @property({ type: String }) title = 'Top stockouts review';
  @property({ type: Array }) products: AppStockReport.Product[] = [];

  static styles = css`
    :host {
      --accent-color: rgba(145, 215, 86, 255);
      --primary-color: rgba(255, 80, 89, 255);
      --light-color: rgba(225, 231, 237, 255);
      --neutral0-color: rgba(0, 0, 0, 255);
      --neutral50-color: rgba(50, 50, 50, 255);
      --neutral150-color: rgba(150, 150, 150, 255);
      --neutral200-color: rgba(200, 200, 200, 255);

      color: var(--neutral150-color);
      display: flex;
      min-height: 100vh;
    }

    main {
      display: flex;
      flex-direction: row;
      font-size: 1rem;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
      padding: 5rem 1rem 1rem 1rem;
    }

    header {
      --text-element-font-size: 1.1rem;
      --text-element-font-weight: 500;

      background-color: var(--primary-color);
      box-shadow: 0 0 0.15rem 0.15rem rgba(0, 0, 0, 0.2);
      color: #fff;
      left: 0;
      padding: 1.2rem 1.75rem;
      position: fixed;
      top: 0;
      text-transform: capitalize;
      width: 100%;
      z-index: 10;
    }

    @media (min-width: 1280px) {
      :host {
        margin: 0 auto;
        max-width: 1280px;
        margin: 0 auto;
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

  renderContent() {
    return this.products.map(({ code }) => html` <product-card code="${code}"></product-card> `);
  }

  render() {
    return html`
      <main>
        <header>
          <text-element heading>${this.title}</text-element>
        </header>
        ${this.products.length > 0
          ? this.renderContent()
          : html` <loading-spinner role="progressbar"></loading-spinner> `}
      </main>
    `;
  }
}
