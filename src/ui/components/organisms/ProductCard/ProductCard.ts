import { LitElement, html, css } from 'lit';
import { connect } from 'pwa-helpers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { AppStockReport } from '@apptypes';
import { RootState, store } from '@infrastructure/state/store';

import '@ui/components/molecules/ProductInfo';

export class ProductCard extends connect(store)(LitElement) {
  @property({ type: Number }) code = undefined;
  @property({ type: String }) private product: AppStockReport.Product | undefined = undefined;

  static styles = css`
    :host {
      display: block;
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
          <img src="${ifDefined(this.product?.imagePath)}" alt="${ifDefined(this.product?.name)}" />
        </div>
        <product-info
          code="${ifDefined(ifDefined(this.code))}"
          name="${ifDefined(this.product?.name)}"
          price="${ifDefined(this.product?.price)}"
        ></product-info>
      </article>
    `;
  }
}
