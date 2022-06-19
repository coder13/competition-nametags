import { configureStore } from '@reduxjs/toolkit';
import tmpReducer from './tmp/tmp.slice';

export * from './hooks';
export * from './types';

export const store = configureStore({
  reducer: {
    tmp: tmpReducer,
  },
});

export * from './tmp';
