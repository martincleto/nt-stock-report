import { doRequest } from '@infrastructure/services/util/request';

export const fetchProducts = async () => {
  const response = await doRequest({ endpoint: 'products' });
  return response;
};
