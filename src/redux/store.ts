import { configureStore } from '@reduxjs/toolkit';

import headerSlice from './slices/headerSlice';
import globalSlice from './slices/globalSlice';
import knowledgeBaseViewSlice from './slices/knowledgeBaseViewSlice';
import knowledgeBaseDataSlice from './slices/knowledgeBaseDataSlice';

import localMyDaySlice from './slices/myDaySlice';

const store = configureStore({
  reducer: {
    headerSlice,
    globalSlice,
    knowledgeBaseViewSlice,
    knowledgeBaseDataSlice,
    localMyDaySlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

export type AppDispatch = typeof store.dispatch;
