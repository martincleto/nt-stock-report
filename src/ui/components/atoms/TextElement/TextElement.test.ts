import { insertElement, getShadowRoot, toPx } from '@test/util';
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

  test('should display a text', async () => {
    await insertElement(`<text-element>${mockText}</text-element>`);

    expect(getByText(rootElement, mockText)).toBeVisible();
  });

  test('should display a heading of level 1', async () => {
    await insertElement(`<text-element heading level="1">${mockText}</text-element>`);
    const heading = getShadowRoot(TAG_NAME).querySelector('h1')!;

    expect(heading).toBeVisible();
    expect(heading).toHaveStyle(`font-size: ${toPx('2.5rem')}`);
  });

  test('should display a heading of level 2', async () => {
    await insertElement(`<text-element heading level="2">${mockText}</text-element>`);
    const heading = getShadowRoot(TAG_NAME).querySelector('h2')!;

    expect(heading).toBeVisible();
    expect(heading).toHaveStyle(`font-size: ${toPx('1.25rem')}`);
  });

  test('should display a heading of level 3', async () => {
    await insertElement(`<text-element heading level="3">${mockText}</text-element>`);
    const heading = getShadowRoot(TAG_NAME).querySelector('h3')!;

    expect(heading).toBeVisible();
    expect(heading).toHaveStyle(`font-size: ${toPx('1rem')}`);
  });

  test('should display uppercased text', async () => {
    await insertElement(`<text-element uppercase>${mockText}</text-element>`);
    textElement = getShadowRoot(TAG_NAME).querySelector('span')!;

    expect(textElement).toHaveStyle('text-transform: uppercase');
  });

  test('should display a large text', async () => {
    await insertElement(`<text-element large>${mockText}</text-element>`);
    textElement = getShadowRoot(TAG_NAME).querySelector('span')!;

    expect(textElement).toHaveStyle(`font-size: ${toPx('2.5rem')}`);
  });

  test('should display a small text', async () => {
    await insertElement(`<text-element small>${mockText}</text-element>`);
    textElement = getShadowRoot(TAG_NAME).querySelector('span')!;

    expect(textElement).toHaveStyle(`font-size: ${toPx('0.75rem')}`);
  });
});
