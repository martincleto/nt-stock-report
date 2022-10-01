import { LitElement, html, css } from 'lit';

export class ProductInfo extends LitElement {
  static styles = css``;

  render() {
    return html`<slot></slot>`;
  }
}
