// import Chart from 'chart.js';
import { LitElement, html, css } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { property } from 'lit/decorators';

export class BarChart extends LitElement {
  @property({ type: String }) chartId = 'barChart';
  @property({ type: Object }) barChart: unknown;

  static styles = css``;

  render() {
    return html`
      <div>
        <canvas id="${this.chartId}" width="400" height="400"></canvas>
      </div>
    `;
  }
}
