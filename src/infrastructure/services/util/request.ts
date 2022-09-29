import { API_HOST } from '@infrastructure/services/config';
import { AppStockReport } from '@apptypes';

const parseJSON = (response: Response) =>
  response.text().then(text => (text ? JSON.parse(text) : null));

const doRequest = async (
  options: AppStockReport.RequestOptions
): Promise<any> => {
  const { endpoint, params, headers, body, method } = options;

  const _params =
    typeof params !== 'undefined'
      ? `?${new URLSearchParams(params).toString()}`
      : '';
  const url = `${API_HOST}/${endpoint}${_params}`;
  const defaultHeaders = new Headers();
  defaultHeaders.set('Content-Type', 'application/json');

  try {
    const response = await fetch(url, {
      method: method || 'GET',
      headers: headers || defaultHeaders,
      body: body ? JSON.stringify(body) : null,
    });

    return parseJSON(response);
  } catch (error) {
    console.error(`Error on request ${url}`, error);
    return Promise.reject(error);
  }
};

export { doRequest };
