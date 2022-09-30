import { LitElement } from 'lit';

const getShadowRoot = (tagName: string): ShadowRoot => document.body.getElementsByTagName(tagName)[0].shadowRoot!;

const customElement = (tagName: string) => ({
  cleanup: () => document.body.getElementsByTagName(tagName)[0].remove(),
  setup: async () => {
    const element = window.document.createElement(tagName) as LitElement;
    await document.body.appendChild(element);

    return element;
  },
});

export { getShadowRoot, customElement };
