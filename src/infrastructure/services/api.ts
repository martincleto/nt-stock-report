import { AppStockReport } from '@apptypes';
import { doRequest } from '@infrastructure/services/util/request';

export const fetchProducts = async (): Promise<AppStockReport.ProductResponse[]> => {
  const response = await doRequest({ endpoint: 'products' });
  return response;
};

export const updateProduct = async (code: String, fields: AppStockReport.FieldsToUpdate): Promise<Response> => {
  const response = await doRequest({
    body: { ...fields },
    endpoint: `products/${code}`,
    method: 'PATCH',
  });
  return response;
};
