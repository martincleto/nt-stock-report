import { LitElement, html, css } from 'lit';

export class ProductCard extends LitElement {
  static styles = css``;

  render() {
    return html`<slot></slot>`;
  }
}
