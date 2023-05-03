import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GlobalState = {
  activeWindow: string;
  activeMenu: string;
};

const initialState: GlobalState = {
  activeWindow: '',
  activeMenu: '',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    activeWindow: (state, action: PayloadAction<string>) => {
      state.activeWindow = action.payload;
    },
    activeMenu: (state, action: PayloadAction<string>) => {
      state.activeMenu = action.payload;
    },
  },
});

const { actions, reducer } = globalSlice;
export default reducer;
export const { activeWindow, activeMenu } = actions;
