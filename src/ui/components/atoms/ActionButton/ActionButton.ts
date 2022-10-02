import { LitElement, html, css } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { property } from 'lit/decorators.js';

export class ActionButton extends LitElement {
  @property({ type: String }) action = 'stockreport:button-click';

  static styles = css`
    :host {
      display: var(--action-button-display, inline-block);
    }

    button {
      background-color: var(--button-background-color, var(--primary-color));
      border: solid 2px var(--button-border-color, var(--light-color));
      border-radius: 1.2rem;
      color: var(--button-text-color, #fff);
      cursor: pointer;
      display: inline-block;
      font-size: 1.25rem;
      font-weight: 500;
      height: 2.5rem;
      line-height: 2rem;
      opacity: 0.75;
      padding: 0 1rem;
      transition: opacity 0.25s ease-in-out;
    }

    button:hover {
      opacity: 1;
    }
  `;

  private _handleClick() {
    const options = {
      bubbles: true,
      detail: this.dataset || {},
      composed: true,
    };
    this.dispatchEvent(new CustomEvent(this.action, options));
  }

  render() {
    return html`
      <button @click="${this._handleClick}">
        <slot></slot>
      </button>
    `;
  }
}
