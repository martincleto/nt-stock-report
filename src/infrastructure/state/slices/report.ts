/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AppStockReport } from '@apptypes';
import { fetchProducts } from '@infrastructure/services/api';
import { ProductDTO } from '@infrastructure/services/dto/productDto';

const initialState: AppStockReport.State = {
  error: undefined,
  products: [],
  status: 'idle',
};

export const getProducts = createAsyncThunk('report/getProducts', async () => {
  const productsData = await fetchProducts();
  const products = productsData.map(productData => {
    const productInstance = new ProductDTO(productData);
    return { ...productInstance };
  });

  return products;
});

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
      });
  },
});

export default reportSlice.reducer;