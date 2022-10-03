/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AppStockReport } from '@apptypes';
import { fetchProducts, updateProduct } from '@infrastructure/services/api';
import { ProductDTO } from '@infrastructure/services/dto/productDto';

const initialState: AppStockReport.State = {
  error: undefined,
  products: [],
  status: 'idle',
};

const normalizeProducts = (products: AppStockReport.ProductResponse[]): AppStockReport.Product[] =>
  products.map(productData => {
    const productInstance = new ProductDTO(productData);
    return { ...productInstance };
  });

export const getProducts = createAsyncThunk('report/getProducts', async () => {
  const productsData = (await fetchProducts()) as AppStockReport.ProductResponse[];
  const products = normalizeProducts(productsData);

  return products;
});

export const markProductAsComplete = createAsyncThunk(
  'report/markProductAsComplete',
  async ({ code, fields }: { code: string; fields: AppStockReport.FieldsToUpdate }) => {
    await updateProduct(code, fields);
    const productsData = (await fetchProducts()) as AppStockReport.ProductResponse[];
    const products = normalizeProducts(productsData);

    return products;
  }
);

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = state.products.concat(action.payload);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(markProductAsComplete.pending, state => {
        state.status = 'loading';
      })
      .addCase(markProductAsComplete.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(markProductAsComplete.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default reportSlice.reducer;
