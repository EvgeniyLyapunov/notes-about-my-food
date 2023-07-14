import { configureStore } from '@reduxjs/toolkit';

import headerSlice from './slices/headerSlice';
import dataViewSlice from './slices/dataViewSlice';
import dataFoodSlice from './slices/dataFoodSlice';
import dataSetsSlice from './slices/dataSetsSlice';
import myDayViewSlice from './slices/myDayViewSlice';
import myDayDataSlice from './slices/myDayDataSlice';
import statisticSlice from './slices/statisticSlice';
import authSlice from './slices/AuthSlice';

const store = configureStore({
  reducer: {
    headerSlice,
    dataViewSlice,
    dataFoodSlice,
    dataSetsSlice,
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
