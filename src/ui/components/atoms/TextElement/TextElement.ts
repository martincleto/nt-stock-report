import { LitElement, html, css } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class TextElement extends LitElement {
  @property({ type: Boolean }) heading = false;
  @property({ type: Boolean }) large = false;
  @property({ type: Number }) level = 1;
  @property({ type: Boolean }) small = false;
  @property({ type: Boolean }) uppercase = false;

  static styles = css`
    :host {
      color: var(--text-element-color, inherit);
    }
    :host,
    h1,
    h2,
    h3 {
      font-weight: var(--text-element-font-weight, inherit);
      margin-bottom: var(--text-element-margin-bottom, inherit);
      margin-top: var(--text-element-margin-top, inherit);
    }

    h1 {
      font-size: var(--text-element-font-size, 2.5rem);
    }

    h2 {
      font-size: var(--text-element-font-size, 1.25rem);
    }

    h3 {
      font-size: var(--text-element-font-size, 1rem);
    }

    .uppercase {
      text-transform: uppercase;
    }

    .large {
      font-size: var(--text-element-font-size, 2.5rem);
    }

    .small {
      font-size: var(--text-element-font-size, 0.75rem);
    }
  `;

  getClassName() {
    const classes = [];

    if (this.uppercase) {
      classes.push('uppercase');
    }

    if (!this.heading) {
      // eslint-disable-next-line no-nested-ternary
      classes.push(this.large ? 'large' : this.small ? 'small' : '');
    }

    return classes.join(' ');
  }

  createTagName() {
    return this.heading ? `h${this.level}` : 'span';
  }

  render() {
    const htmlString = `<${this.createTagName()} class="${this.getClassName()}"><slot></slot></${this.createTagName()}>`;

    return html`${unsafeHTML(htmlString)}`;
  }
}
