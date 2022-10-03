import { LitElement, html, css } from 'lit';
import { connect } from 'pwa-helpers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { property, state } from 'lit/decorators.js';

import { AppStockReport } from '@apptypes';
import { getProducts, markProductAsComplete } from '@infrastructure/state/slices/report';
import { RootState, store } from '@infrastructure/state/store';

import '@ui/components/atoms/ActionButton';
import '@ui/components/atoms/LoadingSpinner';
import '@ui/components/atoms/TextElement';
import '@ui/components/molecules/ModalElement';
import '@ui/components/organisms/ProductCard';

export class MainView extends connect(store)(LitElement) {
  @property({ type: String }) title = 'Top stockouts review';
  @property({ type: Array }) products: AppStockReport.Product[] = [];
  @property() private _modal!: AppStockReport.Modal;

  @state() protected _currentProductCode = '';
  @state() protected _currentProductName = '';

  static styles = css`
    :host {
      --accent-color: rgba(145, 215, 86, 1);
      --light-color: rgba(225, 231, 237, 1);
      --neutral0-color: rgba(0, 0, 0, 1);
      --neutral50-color: rgba(50, 50, 50, 1);
      --neutral150-color: rgba(150, 150, 150, 1);
      --neutral200-color: rgba(200, 200, 200, 1);
      --primary-color: rgba(255, 80, 89, 1);

      color: var(--neutral150-color);
      display: flex;
      min-height: 100vh;
    }

    main {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      font-size: 1rem;
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

    .content {
      width: calc(100% - 0.25rem);
    }

    @media (min-width: 600px) {
      .content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
      }
    }

    @media (min-width: 1280px) {
      :host {
        margin: 0 auto;
        max-width: 1280px;
      }
    }
  `;

  constructor() {
    super();

    this.addEventListener('stockreport:show-confirmation', evt => {
      const { code, name } = (evt as CustomEvent).detail;

      this._modal.isOpen = true;
      this._currentProductCode = code;
      this._currentProductName = name;
    });

    this.addEventListener('stockreport:product-complete', () => {
      store.dispatch(
        markProductAsComplete({
          code: this._currentProductCode,
          fields: { complete: true },
        })
      );
      this._modal.isOpen = false;
      this.requestUpdate();
    });
  }

  connectedCallback() {
    super.connectedCallback();
    store.dispatch(getProducts());
  }

  firstUpdated() {
    this._modal = this.renderRoot.querySelector('modal-element') as AppStockReport.Modal;
  }

  stateChanged(_state: RootState) {
    const { products } = _state.report;
    this.products = [...products]
      .filter(product => !product.complete)
      .sort((a, b) => (a.salesRanking > b.salesRanking ? 1 : -1));
  }

  renderContent() {
    return this.products.map(({ code }) => html` <product-card code="${code}"></product-card> `);
  }

  _closeModal(evt: Event) {
    evt.preventDefault();
    this._modal.isOpen = false;
  }

  render() {
    return html`
      <main>
        <header>
          <text-element heading>${this.title}</text-element>
        </header>
        <div class="content">
          ${this.products.length > 0
            ? this.renderContent()
            : html` <loading-spinner role="progressbar"></loading-spinner> `}
        </div>
      </main>

      <modal-element>
        <p>Do you want to mark <strong>${this._currentProductCode} ${this._currentProductName}</strong> complete?</p>
        <p>
          <action-button action="stockreport:product-complete" data-code="${this._currentProductCode}">
            Yes, mark complete
          </action-button>
        </p>
        <p>
          <a href="#" @click="${this._closeModal}">No, cancel</a>
        </p>
      </modal-element>
    `;
  }
}
