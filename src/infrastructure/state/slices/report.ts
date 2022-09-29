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

  return productsData.map(productData => new ProductDTO(productData));
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
        // Add any fetched posts to the array
        state.products = state.products.concat(action.payload);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default reportSlice.reducer;
