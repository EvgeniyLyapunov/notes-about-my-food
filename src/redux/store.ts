import { configureStore } from '@reduxjs/toolkit';

import headerSlice from './slices/headerSlice';
import globalSlice from './slices/globalSlice';
import knowledgeBaseSlice from './slices/knowledgeBaseSlice';

import localKnowledgeBaseSlice from './slices/localKnowledgeBaseSlise';

const store = configureStore({
  reducer: {
    headerSlice,
    globalSlice,
    knowledgeBaseSlice,
    localKnowledgeBaseSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
