import { configureStore } from '@reduxjs/toolkit';

import globalSlice from './slices/globalSlice';

const store = configureStore({
  reducer: { globalSlice },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
