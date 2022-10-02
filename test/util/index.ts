import { LitElement } from 'lit';

const getShadowRoot = (tagName: string): ShadowRoot => document.body.getElementsByTagName(tagName)[0].shadowRoot!;

const getSlotsAssignedNodes = (element: HTMLElement): Node[] => {
  const slots = element.querySelectorAll('slot');
  let assignedNodes: Node[] = [];

  slots.forEach(slot => {
    assignedNodes = [...assignedNodes, ...slot.assignedNodes()];
  });

  return assignedNodes;
};

const customElement = (tagName: string) => ({
  cleanup: () => document.body.getElementsByTagName(tagName)[0].remove(),
  setup: async (attributes: Record<string, any>[] = []) => {
    const element = window.document.createElement(tagName) as LitElement;

    attributes.forEach(async attr => {
      const [key, value] = Object.entries(attr) as [string, any];
      await element.setAttribute(key, value);
    });

    await document.body.appendChild(element);

    return element;
  },
});

const insertElement = async (html: string) => document.body.insertAdjacentHTML('afterbegin', html);

const toPx = (value: string) => {
  const BASE_FONT_SIZE = 16;
  return `${parseFloat(value) * BASE_FONT_SIZE}px`;
};

export { customElement, insertElement, getShadowRoot, getSlotsAssignedNodes, toPx };
