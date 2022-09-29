import { AppStockReport } from '@apptypes';
import { doRequest } from '@infrastructure/services/util/request';

export const fetchProducts = async (): Promise<
  AppStockReport.ProductResponse[]
> => {
  const response = await doRequest({ endpoint: 'products' });
  return response;
};
