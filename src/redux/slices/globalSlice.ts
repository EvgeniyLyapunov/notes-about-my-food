import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GlobalState = {
  activeWindow: string;
  activeMenu: string;
};

const initialState: GlobalState = {
  activeWindow: 'startScreen',
  activeMenu: 'startMenu',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    activeMenu: (state, action: PayloadAction<string>) => {
      state.activeMenu = action.payload;
    },
  },
});

const { actions, reducer } = globalSlice;
export default reducer;
export const { activeMenu } = actions;
