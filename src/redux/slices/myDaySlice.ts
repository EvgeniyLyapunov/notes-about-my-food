import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFoodItem, IMeal, ICurrentDay } from '../../models/modelTypes';

interface IMyDay {
  currentDay: ICurrentDay;
  mealsList: IMeal[];
  currentMeal: IMeal;
  foodItem: IFoodItem;
  isChangeMealNameVisible: boolean;
  isAddFoodItemVisible: boolean;
  isSelectFoodItemVisible: boolean;
}

const initialState: IMyDay = {
  currentDay: {
    date: '',
    meals: [],
  },
  mealsList: [],
  currentMeal: {
    name: 'Приём пищи',
    foodstuff: [],
    totalCalories: 0,
    totalPrice: 0,
  },
  foodItem: {
    id: 0,
    userId: '',
    name: '',
    calories: 0,
    price: 0,
    weight: 0,
  },
  isChangeMealNameVisible: false,
  isAddFoodItemVisible: false,
  isSelectFoodItemVisible: false,
};

const localMyDaySlice = createSlice({
  name: 'localMyDaySlice',
  initialState,
  reducers: {
    setChangeMealNameVisible: (state, action: PayloadAction<boolean>) => {
      state.isChangeMealNameVisible = action.payload;
    },
    setAddFoodItemVisible: (state, action: PayloadAction<boolean>) => {
      state.isAddFoodItemVisible = action.payload;
    },
    setSelectFoodItemVisible: (state, action: PayloadAction<boolean>) => {
      state.isSelectFoodItemVisible = action.payload;
    },
    setMealName: (state, action: PayloadAction<string>) => {
      state.currentMeal.name = action.payload;
    },
    addToFoodStuff: (state, action: PayloadAction<IFoodItem>) => {
      state.currentMeal.foodstuff = [
        ...state.currentMeal.foodstuff,
        action.payload,
      ];
    },
    resetCurrenFoodItem: (state) => {
      state.foodItem = {
        id: 0,
        userId: '',
        name: '',
        calories: 0,
        price: 0,
        weight: 0,
      };
    },
  },
});

const { actions, reducer } = localMyDaySlice;
export default reducer;
export const {
  setChangeMealNameVisible,
  setAddFoodItemVisible,
  setSelectFoodItemVisible,
  setMealName,
  addToFoodStuff,
  resetCurrenFoodItem,
} = actions;
