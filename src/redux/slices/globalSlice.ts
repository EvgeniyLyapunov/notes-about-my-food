import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GlobalState = {
  userId: string | null;
};

const initialState: GlobalState = {
  userId: 'wkxuDcalTBo_GC4gu0iM2',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

const { actions, reducer } = globalSlice;
export default reducer;
export const { setUserId } = actions;
