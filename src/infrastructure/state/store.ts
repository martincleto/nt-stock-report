import { configureStore, combineReducers } from '@reduxjs/toolkit';

import reportReducer from './slices/report';

const rootReducer = combineReducers({ report: reportReducer });

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
