import { LitElement, html, css } from 'lit';
import { connect } from 'pwa-helpers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { AppStockReport } from '@apptypes';
import { RootState, store } from '@infrastructure/state/store';

import '@ui/components/atoms/ActionButton';
import '@ui/components/molecules/BarChart';
import '@ui/components/molecules/ProductInfo';
import '@ui/components/molecules/WarehouseCoverage';

export class ProductCard extends connect(store)(LitElement) {
  @property({ type: Number }) code = undefined;
  @property({ type: Object }) private product: AppStockReport.Product | undefined = undefined;

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    article {
      background-color: #fff;
      border-radius: 0.25rem;
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
      overflow: hidden;
    }

    action-button {
      --button-background-color: rgba(31, 54, 71, 1);
    }

    .product-image {
      position: relative;
    }

    .product-image span {
      background-color: var(--neutral200-color);
      border-radius: 0.2rem;
      color: #fff;
      display: block;
      font-size: 0.8rem;
      height: 1.2rem;
      left: 0.5rem;
      line-height: 1.2rem;
      position: absolute;
      text-align: center;
      top: 0.5rem;
      width: 1.2rem;
    }

    .product-image img {
      max-width: 100%;
      width: 100%;
    }

    .product-image .action-wrapper {
      align-items: center;
      background-color: rgba(256, 256, 256, 0.5);
      bottom: 0;
      display: flex;
      justify-content: center;
      left: 0;
      opacity: 0;
      position: absolute;
      right: 0;
      transition: opacity 0.3s ease-in-out;
      top: 0;
    }

    .product-image:hover .action-wrapper {
      opacity: 1;
    }

    @media (min-width: 600px) {
      :host {
        width: calc(50% - 1rem);
      }
    }

    @media (min-width: 960px) {
      :host {
        width: calc(25% - 1rem);
      }
    }
  `;

  stateChanged(state: RootState) {
    const { products } = state.report;
    this.product = products.find(product => product.code === this.code);
  }

  render() {
    return html`
      <article>
        <div class="product-image">
          <span>${this.product?.salesRanking}</span>
          <img src="${ifDefined(this.product?.imagePath)}" alt="${ifDefined(this.product?.name)}" />
          <div class="action-wrapper">
            <action-button action="stockreport:markcomplete">Mark Complete</action-button>
          </div>
        </div>

        <product-info
          code="${ifDefined(ifDefined(this.code))}"
          name="${ifDefined(this.product?.name)}"
          price="${ifDefined(this.product?.price)}"
        ></product-info>

        <bar-chart
          chartId="size-stock-${this.code}"
          data="${JSON.stringify(ifDefined(this.product?.sizeStock))}"
        ></bar-chart>

        <warehouse-coverage
          coverage="${ifDefined(this.product?.warehouseCoverage)}"
          label="${ifDefined(this.product?.coverageLabel)}"
        ></warehouse-coverage>
      </article>
    `;
  }
}
