import { LitElement, html, css } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { property } from 'lit/decorators.js';

import '@ui/components/atoms/TextElement';

export class WarehouseCoverage extends LitElement {
  @property({ type: Number }) coverage = 0;
  @property({ type: String }) label = '';

  static styles = css`
    :host {
      display: block;
      padding: 0.5rem 1rem;
    }

    text-element {
      display: block;
    }

    text-element[uppercase] {
      --text-element-color: var(--neutral200-color);
    }

    text-element[large]::after {
      content: '%';
      font-size: 1rem;
      font-weight: 700;
      position: relative;
      top: -1rem;
    }

    progress {
      appearance: none;
      height: 0.625rem;
      width: 100%;
    }

    ::-webkit-progress-bar {
      background-color: var(--light-color);
      border-radius: 0.625rem;
    }

    ::-webkit-progress-value {
      background-color: var(--accent-color);
      border-radius: 0.625rem;
    }

    .coverage {
      border-color: var(--light-color);
      border-style: solid;
      border-width: 1px 0;
      padding: 0.5rem 0;
    }

    .label {
      padding: 0.5rem 0;
      text-align: right;
    }

    .label-very-low,
    .label-low {
      color: var(--primary-color);
    }

    .label-good,
    .label-very-good {
      color: var(--accent-color);
    }

    .progress-bar {
      height: 1.25rem;
      margin-top: -0.5rem;
      overflow: hidden;
    }
  `;

  getLabelClassName() {
    const labelClassName = this.label
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();

    return `label label-${labelClassName}`;
  }

  render() {
    return html`
      <div class="coverage">
        <text-element large>${this.coverage}</text-element>
        <text-element uppercase>Stockout</text-element>
        <div class="progress-bar">
          <progress max="100" value="${this.coverage}">${this.coverage}</progress>
        </div>
      </div>
      <div class="${this.getLabelClassName()}">
        <text-element>${this.label}</text-element>
        <text-element uppercase>WH coverage</text-element>
      </div>
    `;
  }
}
