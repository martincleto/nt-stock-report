// eslint-disable-next-line import/no-extraneous-dependencies
import { findByRole, findByText, waitFor } from '@testing-library/dom';

import { customElement, getShadowRoot } from '@test/util';

const TAG_NAME = 'product-card';

/* @TODO fix skipped tests not working */
describe(TAG_NAME, () => {
  const mockProduct = {
    code: 182295,
    coverageLabel: 'Low',
    imagePath: 'content/images/182295.jpg',
    name: 'ACME PRODUCT 02509',
    price: '22,99',
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

  beforeEach(async () => {
    await customElement(TAG_NAME).setup([{ code: mockProduct.code }]);
  });

  afterEach(() => {
    customElement(TAG_NAME).cleanup();
  });

  test('should show an image', async () => {
    const imageWrapper = getShadowRoot(TAG_NAME).querySelector('.product-image') as HTMLDivElement;
    const image = (await findByRole(imageWrapper, 'img')) as HTMLImageElement;

    expect(image).toBeVisible();
    waitFor(() => expect(image.src).toBe(mockProduct.imagePath));
  });

  test.skip('should show the sales ranking', async () => {
    const imageWrapper = getShadowRoot(TAG_NAME).querySelector('.product-image') as HTMLDivElement;

    const ranking = await findByText(imageWrapper, mockProduct.salesRanking);

    waitFor(() => expect(ranking).toBeVisible());
  });

  test('should show the product info', () => {
    const productInfo = getShadowRoot(TAG_NAME).querySelector('product-info')!;
    const expectedAttrs = ['code', 'name', 'price'];

    expect(productInfo).toBeVisible();
    waitFor(() => {
      expectedAttrs.forEach(attr => {
        const expectedValue = mockProduct[attr as keyof typeof mockProduct];

        expect(productInfo).toHaveAttribute(attr, expectedValue);
      });
    });
  });

  test('should show a size stock chart', async () => {
    const barChart = getShadowRoot(TAG_NAME).querySelector('bar-chart')!;

    expect(barChart).toBeVisible();
    waitFor(() => expect(barChart).toHaveAttribute('data', JSON.stringify(mockProduct.sizeStock)));
  });

  test.skip('should show a warehouse coverage', async () => {
    const warehouseCoverage = getShadowRoot(TAG_NAME).querySelector('warehouse-coverage')!;

    expect(warehouseCoverage).toBeVisible();
    waitFor(() => expect(warehouseCoverage).toHaveAttribute('coverage', mockProduct.warehouseCoverage.toString()));
  });
});
