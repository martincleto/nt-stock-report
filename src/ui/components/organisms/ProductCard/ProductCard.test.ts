// eslint-disable-next-line import/no-extraneous-dependencies
import { getByRole, getByText } from '@testing-library/dom';

import { getShadowRoot, insertElement } from '@test/util';

const TAG_NAME = 'product-card';

describe(TAG_NAME, () => {
  const mockProduct = {
    code: 182295,
    coverageLabel: 'Low',
    imagePath: 'content/images/182295.jpg',
    name: 'ACME PRODUCT 02509',
    price: '22,99 €',
    salesRanking: 2,
    sizeStock: {
      S: 1,
      M: 2,
      L: 0,
      XL: 4,
      XXL: 0,
    },
    stockoutRate: 40.1,
    warehouseCoverage: 25,
  };

  const rootElement = document.body;

  beforeEach(() => {
    insertElement(`<product-card code="${mockProduct.code}"></product-card>`);
  });

  afterEach(() => {
    document.body.getElementsByTagName(TAG_NAME)[0].remove();
  });

  test('should show an image', () => {
    const image = getByRole(rootElement, 'img') as HTMLImageElement;

    expect(image).toBeVisible();
    expect(image.src).toBe(mockProduct.imagePath);
  });

  test('should show the sales ranking', () => {
    const ranking = getByText(rootElement, `#${mockProduct.salesRanking}`);

    expect(ranking).toBeVisible();
  });

  test('should show the product info', () => {
    const productInfo = getShadowRoot(TAG_NAME).querySelector('product-info')!;
    const expectedAttrs = ['code', 'name', 'price'];

    expect(productInfo).toBeVisible();
    expectedAttrs.forEach(attr => {
      const expectedValue = mockProduct[attr as keyof typeof mockProduct];

      expect(productInfo).toHaveAttribute(attr, expectedValue);
    });
  });

  test('should show a size stock chart', () => {
    const barChart = getShadowRoot(TAG_NAME).querySelector('bar-chart')!;

    expect(barChart).toBeVisible();
    expect(barChart).toHaveAttribute('data', JSON.stringify(mockProduct.sizeStock));
  });

  test('should show a warehouse coverage', () => {
    const warehouseCoverage = getShadowRoot(TAG_NAME).querySelector('warehouse-coverage')!;

    expect(warehouseCoverage).toBeVisible();
    expect(warehouseCoverage).toHaveAttribute('coverage', mockProduct.warehouseCoverage.toString());
  });
});
