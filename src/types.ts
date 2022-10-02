import { LitElement } from 'lit';

export namespace AppStockReport {
  export type CoverageLabel = 'Very Low' | 'Low' | 'Good' | 'Very Good';
  export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';
  /* eslint-disable camelcase */
  export type ProductResponse = {
    code: number;
    name: string;
    price: number;
    sales_ranking: number;
    size_stock: Record<Size, number>;
    stockout_rate: number;
    wh_coverage: number;
  };
  /* eslint-enable camelcase */
  export interface RequestOptions {
    endpoint: string;
    params?: Record<string, string>;
    headers?: Headers;
    body?: Record<string, unknown>;
    method?: 'DELETE' | 'GET' | 'POST' | 'PUT';
  }

  export interface Modal extends LitElement {
    isOpen: boolean;
  }
  export interface Product {
    code: number;
    coverageLabel: CoverageLabel;
    imagePath: string;
    name: string;
    price: string;
    salesRanking: number;
    sizeStock: Record<Size, number>;
    stockoutRate: number;
    warehouseCoverage: number;
  }

  export interface State {
    error: string | undefined;
    products: Product[];
    status: 'failed' | 'idle' | 'loading' | 'succeeded';
  }
}
