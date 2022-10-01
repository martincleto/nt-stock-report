import { LitElement, html, css } from 'lit';

export class TextElement extends LitElement {
  static styles = css``;

  render() {
    return html`<slot></slot>`;
  }
}
