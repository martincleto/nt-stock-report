import { LitElement, html, css } from 'lit';

// credits: https://tobiasahlin.com/spinkit/
export class LoadingSpinner extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      justify-content: center;
    }

    .spinner {
      margin: 0 auto;
      width: 50px;
      height: 40px;
      text-align: center;
      font-size: 10px;
    }

    .spinner > div {
      background-color: #333;
      height: 100%;
      width: 6px;
      display: inline-block;

      -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
      animation: sk-stretchdelay 1.2s infinite ease-in-out;
    }

    .spinner .rect2 {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }

    .spinner .rect3 {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }

    .spinner .rect4 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }

    .spinner .rect5 {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }

    @-webkit-keyframes sk-stretchdelay {
      0%,
      40%,
      100% {
        -webkit-transform: scaleY(0.4);
      }
      20% {
        -webkit-transform: scaleY(1);
      }
    }

    @keyframes sk-stretchdelay {
      0%,
      40%,
      100% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
      }
      20% {
        transform: scaleY(1);
        -webkit-transform: scaleY(1);
      }
    }
  `;

  render() {
    return html`
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    `;
  }
}
