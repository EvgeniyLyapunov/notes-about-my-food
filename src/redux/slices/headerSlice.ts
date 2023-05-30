import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type HeaderBlockState = {
  isStartBurgerActive: boolean;
  isAppBurgerActive: boolean;
  pageName: string;
  pageFrom: string;
  hideActivePageLink: string;
};

const initialState: HeaderBlockState = {
  isStartBurgerActive: false,
  isAppBurgerActive: false,
  pageName: 'startScreen',
  pageFrom: 'startScreen',
  hideActivePageLink: '',
};

const HeaderSlice = createSlice({
  name: 'headerBlock',
  initialState,
  reducers: {
    startBurgerMenuActive: (state) => {
      state.isStartBurgerActive = !state.isStartBurgerActive;
    },
    appBurgerMenuActive: (state, action: PayloadAction<boolean>) => {
      state.isAppBurgerActive = action.payload;
    },
    changePageName: (state, action: PayloadAction<string>) => {
      state.pageName = action.payload;
    },
    setPageFrom: (state, action: PayloadAction<string>) => {
      state.pageFrom = action.payload;
    },
    hidingActivePageLink: (state, action: PayloadAction<string>) => {
      state.hideActivePageLink = action.payload;
    },
  },
});

const { actions, reducer } = HeaderSlice;
export default reducer;
export const {
  startBurgerMenuActive,
  appBurgerMenuActive,
  changePageName,
  setPageFrom,
  hidingActivePageLink,
} = actions;
