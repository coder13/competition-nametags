import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './auth/auth.slice';
import thunk from 'redux-thunk';
import { api } from './api';

export * from './hooks';
export * from './types';

const persistConfig = {
  key: 'auth',
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    api: api.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk, api.middleware],
});

export const persistor = persistStore(store);

export * from './auth';
