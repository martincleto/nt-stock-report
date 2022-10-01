import { insertElement } from '@test/util';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getByText } from '@testing-library/dom';

const TAG_NAME = 'product-info';

describe(TAG_NAME, () => {
  const mockProps = {
    code: '123456',
    name: 'A cool jacket',
    price: '19,99 €',
  };
  const rootElement = document.body;

  afterEach(() => {
    document.body.getElementsByTagName(TAG_NAME)[0].remove();
  });

  test('should show the product code', () => {
    insertElement(`<product-info code="${mockProps.name}"></product-info>`);
    const code = getByText(rootElement, mockProps.code);

    expect(code).toBeVisible();
  });

  test('should show the product name', () => {
    insertElement(`<product-info name="${mockProps.name}"></product-info>`);
    const name = getByText(rootElement, mockProps.name);

    expect(name).toBeVisible();
  });

  test('should show the product price', () => {
    insertElement(`<product-info price="${mockProps.name}"></product-info>`);
    const price = getByText(rootElement, mockProps.price);

    expect(price).toBeVisible();
  });
});
