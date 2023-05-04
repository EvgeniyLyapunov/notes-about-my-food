import { createSlice } from '@reduxjs/toolkit';

type StartScreenState = {
  isStartBurgerActive: boolean;
};

const initialState: StartScreenState = {
  isStartBurgerActive: false,
};

const StartScreenSlice = createSlice({
  name: 'startScreen',
  initialState,
  reducers: {
    burgerMenuActive: (state) => {
      state.isStartBurgerActive = !state.isStartBurgerActive;
    },
  },
});

const { actions, reducer } = StartScreenSlice;
export default reducer;
export const { burgerMenuActive } = actions;
