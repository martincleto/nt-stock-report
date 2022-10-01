import { LitElement, html, css } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { property } from 'lit/decorators.js';

import '@ui/components/atoms/TextElement';

export class ProductInfo extends LitElement {
  @property({ type: Number }) code = undefined;
  @property({ type: String }) name = '';
  @property({ type: String }) price = '';

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }

    text-element[heading] {
      --text-element-font-size: 1rem;
      --text-element-margin-bottom: 1rem;
      color: var(--neutral50-color);
    }
  `;

  render() {
    return html`
      <header>
        <text-element small>${this.code}</text-element>
        <text-element heading level="2">${this.name}</text-element>
        <text-element>${this.price}</text-element>
      </header>
    `;
  }
}
