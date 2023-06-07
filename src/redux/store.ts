import { configureStore } from '@reduxjs/toolkit';

import headerSlice from './slices/headerSlice';
import knowledgeBaseViewSlice from './slices/knowledgeBaseViewSlice';
import knowledgeBaseDataSlice from './slices/knowledgeBaseDataSlice';
import myDayViewSlice from './slices/myDayViewSlice';
import myDayDataSlice from './slices/myDayDataSlice';
import statisticSlice from './slices/statisticSlice';
import authSlice from './slices/AuthSlice';

const store = configureStore({
  reducer: {
    headerSlice,
    knowledgeBaseViewSlice,
    knowledgeBaseDataSlice,
    myDayViewSlice,
    myDayDataSlice,
    statisticSlice,
    authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

export type AppDispatch = typeof store.dispatch;
