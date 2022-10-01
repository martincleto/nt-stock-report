import { insertElement, getShadowRoot } from '@test/util';
// eslint-disable-next-line import/no-extraneous-dependencies
import { findByText, getByText } from '@testing-library/dom';

const TAG_NAME = 'product-info';

describe(TAG_NAME, () => {
  const mockProps = {
    code: 123456,
    name: 'A cool jacket',
    price: '19,99 €',
  };
  const rootElement = document.body;

  afterEach(() => {
    document.body.getElementsByTagName(TAG_NAME)[0].remove();
  });

  test('should show the product code', async () => {
    await insertElement(`<product-info code="${mockProps.code}"></product-info>`);
    const productInfo = getShadowRoot(TAG_NAME).firstElementChild! as HTMLElement;

    const code = await findByText(productInfo, mockProps.code);

    expect(code).toBeVisible();
  });

  test('should show the product name', async () => {
    await insertElement(`<product-info name="${mockProps.name}"></product-info>`);
    const productInfo = getShadowRoot(TAG_NAME).firstElementChild! as HTMLElement;

    const name = await findByText(productInfo, mockProps.name);

    expect(name).toBeVisible();
  });

  test('should show the product price', async () => {
    await insertElement(`<product-info price="${mockProps.price}"></product-info>`);
    const productInfo = getShadowRoot(TAG_NAME).firstElementChild! as HTMLElement;

    const price = await findByText(productInfo, mockProps.price);

    expect(price).toBeVisible();
  });
});
