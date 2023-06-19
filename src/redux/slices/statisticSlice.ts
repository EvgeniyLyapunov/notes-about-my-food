import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';

import { IMyDayResult } from '../../models/modelTypes';

import { getDaysResult } from '../asyncThunks/getDaysResult';

interface IStatisticSlice {
  daysList: IMyDayResult[];
  dataLoadingStatus: boolean;
  dataLoadingError: string | null;
}

const initialState: IStatisticSlice = {
  daysList: [],
  dataLoadingStatus: false,
  dataLoadingError: null,
};

const statisticSlice = createSlice({
  name: 'statisticSlice',
  initialState,
  reducers: {
    resetStatisticToInitState: (state) => {
      state.daysList = [];
    },
    resetErrorInfo: (state) => {
      state.dataLoadingError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDaysResult.pending, (state) => {
        state.dataLoadingError = null;
        state.dataLoadingStatus = true;
      })
      .addCase(
        getDaysResult.fulfilled,
        (state, action: PayloadAction<IMyDayResult[]>) => {
          state.dataLoadingStatus = false;
          state.daysList = action.payload;
        }
      )
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.dataLoadingError = action.payload;
        state.dataLoadingStatus = false;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = statisticSlice;
export default reducer;
export const { resetErrorInfo, resetStatisticToInitState } = actions;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
