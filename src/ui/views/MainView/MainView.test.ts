/* eslint-disable import/no-extraneous-dependencies */
import { LitElement } from 'lit';
import { getByRole, getByText, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { CURRENCY, CURRENCY_LOCALE, IMAGE_FOLDER } from '@appconfig';
import { customElement } from '@test/util';

const originalFetch = window.fetch;

const TAG_NAME = 'main-view';

describe(TAG_NAME, () => {
  const mockProduct = {
    id: 182295,
    code: 182295,
    complete: false,
    name: 'ACME PRODUCT 02509',
    price: 22.99,
    sales_ranking: 2,
    stockout_rate: 0.401,
    wh_coverage: 0.25,
    size_stock: {
      S: 1,
      M: 2,
      L: 0,
      XL: 4,
      XXL: 0,
    },
  };
  const mockProducts = Array(5).fill(mockProduct);
  let mainView: LitElement;
  let rootElement: HTMLElement | ShadowRoot;

  beforeEach(async () => {
    mainView = await customElement(TAG_NAME).setup();
    rootElement = mainView.renderRoot;
  });

  afterEach(() => {
    document.body.getElementsByTagName(TAG_NAME)[0].remove();
  });

  test('should show the data are loading', () => {
    const loadingIndicator = getByRole(rootElement as HTMLElement, 'progressbar');
    expect(loadingIndicator).toBeVisible();
  });

  test('should show a header with the report title', () => {
    const header = rootElement.querySelector('header')!;
    const expectedTitle = 'Top stockouts review';
    const actualTitle = getByText(header, expectedTitle);

    expect(actualTitle).toBeVisible();
  });

  describe('when data loaded', () => {
    const formattedPrice = (price: number) =>
      new Intl.NumberFormat(CURRENCY_LOCALE, {
        style: 'currency',
        currency: CURRENCY,
      }).format(price);

    beforeAll(() => {
      (window.fetch as jest.Mock) = jest.fn(() =>
        Promise.resolve({
          text: () => Promise.resolve(JSON.stringify(mockProducts)),
        })
      );
    });

    beforeEach(async () => {
      mainView = await customElement(TAG_NAME).setup();
      rootElement = mainView.renderRoot;
    });

    afterAll(() => {
      window.fetch = originalFetch;
    });

    test('should show products', async () => {
      await mainView.updateComplete;
      rootElement = mainView.renderRoot;

      const products = Array.from(rootElement.querySelectorAll('.content product-card'));

      expect(products.length).toEqual(mockProducts.length);

      products.forEach((product, index) => {
        const productInfoElement = (product as LitElement).renderRoot.querySelector('product-info')!;
        const productInfo = (productInfoElement as LitElement).renderRoot.firstElementChild! as HTMLElement;
        const code = getByText(productInfo, mockProducts[index].code);
        const image = (product as LitElement).renderRoot.querySelector('img')!;
        const name = getByText(productInfo, mockProducts[index].name);
        const price = getByText(productInfo, formattedPrice(mockProducts[index].price), { collapseWhitespace: false });

        expect(code).toBeVisible();
        expect(image.src).toContain(`${IMAGE_FOLDER}/${mockProducts[index].code}`);
        expect(image).toBeVisible();
        expect(name).toBeVisible();
        expect(price).toBeVisible();
      });
    });

    test('should show a modal to confirm `mark complete` action', async () => {
      await mainView.updateComplete;
      rootElement = mainView.renderRoot;

      const user = userEvent.setup();
      const product = rootElement.querySelector('.content product-card')!;
      const actionButtonElement = (product as LitElement).renderRoot.querySelector('action-button')!;
      const button = (actionButtonElement as LitElement).renderRoot.querySelector('button')!;
      const image = (product as LitElement).renderRoot.querySelector('img')!;
      const modalElement = rootElement.querySelector('modal-element')!;

      user.hover(image);
      user.click(button);

      expect(button).toBeVisible();
      expect(modalElement).toBeVisible();
    });
  });
});
