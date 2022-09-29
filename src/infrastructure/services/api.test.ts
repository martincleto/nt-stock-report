/* eslint-disable no-return-await */
import { fetchProducts } from '@infrastructure/services/api';

const mockProducts = [
  {
    code: 182295,
    name: 'ACME PRODUCT 02509',
    price: 22.99,
  },
  {
    code: 182296,
    name: 'ACME PRODUCT 02510',
    price: 22.99,
  },
];

const mockError = new Error('Something was wrong!');

describe('API', () => {
  let mockFetch: jest.SpyInstance;

  beforeEach(() => {
    mockFetch = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchProducts', () => {
    test('should return products on success', async () => {
      mockFetch.mockImplementation(() =>
        Promise.resolve({
          text: () => Promise.resolve(JSON.stringify(mockProducts)),
        })
      );

      const response = await fetchProducts();

      expect(response).toEqual(mockProducts);
    });

    test('should return an error on error', async () => {
      mockFetch.mockImplementation(() => Promise.reject(mockError));

      const response = async () => await fetchProducts();

      expect(response).rejects.toEqual(mockError);
    });
  });
});
