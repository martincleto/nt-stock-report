export namespace AppStockReport {
  export interface RequestOptions {
    endpoint: string;
    params?: Record<string, string>;
    headers?: Headers;
    body?: Record<string, unknown>;
    method?: 'DELETE' | 'GET' | 'POST' | 'PUT';
  }
}
