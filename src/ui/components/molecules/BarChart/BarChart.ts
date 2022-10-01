import { Chart, registerables } from 'chart.js';
import { LitElement, html, css } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { property } from 'lit/decorators.js';

Chart.register(...registerables);

export class BarChart extends LitElement {
  @property() chartId: string = 'barChart';
  @property() data: string = '';

  @property() private _chart!: object;

  static styles = css`
    :host {
      display: block;
    }

    div {
      padding: 1rem 2rem;
    }
  `;

  firstUpdated() {
    const canvas = this.shadowRoot?.querySelector(`#${this.chartId}`) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    const data = JSON.parse(this.data);

    this._chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: '#000',
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: '#999',
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            max: 4,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }

  render() {
    return html`
      <div>
        <canvas id="${this.chartId}" width="400" height="200"></canvas>
      </div>
    `;
  }
}
