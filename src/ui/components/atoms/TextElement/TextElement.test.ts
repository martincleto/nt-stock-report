import { insertElement, getShadowRoot } from '@test/util';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getByText } from '@testing-library/dom';

const TAG_NAME = 'text-element';

describe(TAG_NAME, () => {
  const mockText = 'Hello Mars!';
  const rootElement = document.body;
  let textElement: HTMLElement;

  afterEach(() => {
    document.body.getElementsByTagName(TAG_NAME)[0].remove();
  });

  test('should display a text', () => {
    insertElement(`<text-element>${mockText}</text-element>`);

    expect(getByText(rootElement, mockText)).toBeVisible();
  });

  test('should display a heading of level 1', () => {
    insertElement(`<text-element heading level="1">${mockText}</text-element>`);
    const heading = getShadowRoot(TAG_NAME).querySelector('h1')!;

    expect(heading).toBeVisible();
    expect(heading).toHaveStyle('font-size: 2.5rem');
  });

  test('should display a heading of level 2', () => {
    insertElement(`<text-element heading level="2">${mockText}</text-element>`);
    const heading = getShadowRoot(TAG_NAME).querySelector('h2')!;

    expect(heading).toBeVisible();
    expect(heading).toHaveStyle('font-size: 1.75rem');
  });

  test('should display a heading of level 3', () => {
    insertElement(`<text-element heading level="3">${mockText}</text-element>`);
    const heading = getShadowRoot(TAG_NAME).querySelector('h3')!;

    expect(heading).toBeVisible();
    expect(heading).toHaveStyle('font-size: 1.5rem');
  });

  test('should display uppercased text', () => {
    insertElement(`<text-element heading level="3">${mockText}</text-element>`);
    textElement = getShadowRoot(TAG_NAME).querySelector('span')!;

    expect(textElement).toHaveStyle('text-transform: uppercase');
  });

  test('should display a large text', () => {
    insertElement(`<text-element large>${mockText}</text-element>`);
    textElement = getShadowRoot(TAG_NAME).querySelector('span')!;

    expect(textElement).toHaveStyle('font-size: 3.5rem');
  });

  test('should display a small text', () => {
    insertElement(`<text-element small>${mockText}</text-element>`);
    textElement = getShadowRoot(TAG_NAME).querySelector('span')!;

    expect(textElement).toHaveStyle('font-size: 0.75rem');
  });
});
