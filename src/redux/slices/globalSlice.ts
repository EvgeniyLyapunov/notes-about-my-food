import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GlobalState = {
  userId: string | null;
  activeMenu: string;
};

const initialState: GlobalState = {
  userId: 'wkxuDcalTBo_GC4gu0iM2',
  activeMenu: 'startMenu',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    activeMenu: (state, action: PayloadAction<string>) => {
      state.activeMenu = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

const { actions, reducer } = globalSlice;
export default reducer;
export const { activeMenu, setUserId } = actions;
