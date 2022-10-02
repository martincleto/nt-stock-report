import { LitElement, html, css } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { property, state } from 'lit/decorators.js';

const iconClose = html`
  <svg viewBox="0 0 32 32">
    <g>
      <line x1="7" x2="25" y1="7" y2="25" fill="none" stroke="#000" stroke-linejoin="round" stroke-width="2" />
      <line x1="7" x2="25" y1="25" y2="7" fill="none" stroke="#000" stroke-linejoin="round" stroke-width="2" />
    </g>
  </svg>
`;

export class ModalElement extends LitElement {
  @property({ type: Boolean }) isOpen = false;

  private _closeModal() {
    this.isOpen = false;
    this.requestUpdate();
  }

  static styles = css`
    :host {
      display: block;
    }

    .backdrop {
      opacity: 0;
      transition: opacity 0.3s linear;
      visibility: none;
    }

    .button-close {
      background-color: transparent;
      border: none;
      cursor: pointer;
      height: 2rem;
      margin-left: calc(100% - 2rem);
      padding: 0;
      width: 2rem;
    }

    .modal {
      background-color: var(--modal-background-color, #fff);
      color: var(--modal-color, #000);
      height: 100%;
      padding: 1rem;
      position: fixed;
      opacity: 0;
      overflow: hidden;
      transition: opacity 0.3s linear;
      visibility: hidden;
      width: calc(100% - 2rem);
      z-index: var(--modal-z-index, 100);
    }

    .modal--visible {
      opacity: 1;
      transition: opacity 0.3s linear;
      visibility: visible;
    }

    .modal__content {
      align-items: center;
      display: flex;
      justify-content: center;
      height: 100%;
    }

    .modal__content div {
      text-align: center;
    }

    @media (min-width: 600px) {
      .modal {
        border-radius: 0.3rem;
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
        height: 60%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        width: 60%;
      }

      .backdrop--visible {
        background-color: rgba(0, 0, 0, 0.5);
        display: block;
        height: 100%;
        opacity: 1;
        position: absolute;
        transition: opacity 0.3s linear;
        width: 100%;
        z-index: var(--modal-backdrop-z-index, 99);
      }
    }
  `;

  render() {
    return html`
      <div class="modal ${this.isOpen ? 'modal--visible' : ''}" role="dialog">
        <button @click=${this._closeModal} class="button-close" title="Close">${iconClose}</button>
        <div class="modal__content">
          <div>
            <slot></slot>
          </div>
        </div>
      </div>
      <div class="backdrop ${this.isOpen ? 'backdrop--visible' : ''}"></div>
    `;
  }
}
