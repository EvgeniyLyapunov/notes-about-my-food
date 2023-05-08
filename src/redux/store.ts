import { configureStore } from '@reduxjs/toolkit';

import headerSlice from './slices/headerSlice';
import globalSlice from './slices/globalSlice';
import knowledgeBase from './slices/knowledgeBaseSlice';

const store = configureStore({
  reducer: { headerSlice, globalSlice, knowledgeBase },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
