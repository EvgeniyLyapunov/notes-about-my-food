import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IMyDayView {
  isChangeMealNameVisible: boolean;
  isAddFoodItemVisible: boolean;
  isSelectFoodItemVisible: boolean;
  isClearModeActive: boolean;
  isViewMode: boolean;
}

const initialState: IMyDayView = {
  isChangeMealNameVisible: false,
  isAddFoodItemVisible: false,
  isSelectFoodItemVisible: false,
  isClearModeActive: false,
  isViewMode: false,
};

const myDayViewSlice = createSlice({
  name: 'myDayViewSlice',
  initialState,
  reducers: {
    // устанавливает флаг видимости для окна изменения названия приёма пищи
    setChangeMealNameVisible: (state, action: PayloadAction<boolean>) => {
      state.isChangeMealNameVisible = action.payload;
    },
    // устанавливает флаг видимости для окна добавления продукта в лист приёма пищи
    setAddFoodItemVisible: (state, action: PayloadAction<boolean>) => {
      state.isAddFoodItemVisible = action.payload;
    },
    // устанавливает флаг видимости для окна списка продуктов из базы знания
    setSelectFoodItemVisible: (state, action: PayloadAction<boolean>) => {
      state.isSelectFoodItemVisible = action.payload;
    },
    // установка флага активности режима удаление продуктов из списка приёма пищи
    setClearActiveMode: (state, action: PayloadAction<boolean>) => {
      state.isClearModeActive = action.payload;
    },
    // установка флага активности окна просмотра или окна редактирования myDay
    setViewMode: (state) => {
      state.isViewMode = !state.isViewMode;
    },
  },
});

const { actions, reducer } = myDayViewSlice;
export default reducer;
export const {
  setChangeMealNameVisible,
  setAddFoodItemVisible,
  setSelectFoodItemVisible,
  setClearActiveMode,
  setViewMode,
} = actions;
