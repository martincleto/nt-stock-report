import { LitElement, html, css } from 'lit';

import '@ui/views/MainView';

export class AppBootstrap extends LitElement {
  static styles = css`
    :host {
      --accent-color: rgba(145, 215, 86, 1);
      --light-color: rgba(225, 231, 237, 1);
      --neutral0-color: rgba(0, 0, 0, 1);
      --neutral50-color: rgba(50, 50, 50, 1);
      --neutral150-color: rgba(150, 150, 150, 1);
      --neutral200-color: rgba(200, 200, 200, 1);
      --primary-color: rgba(255, 80, 89, 1);

      display: block;
    }
  `;

  render() {
    return html`<main-view></main-view>`;
  }
}
