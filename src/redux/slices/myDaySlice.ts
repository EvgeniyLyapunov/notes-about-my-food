import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  BaseItem,
  IFoodItem,
  IMeal,
  ICurrentDay,
} from '../../models/modelTypes';

interface IMyDay {
  currentDay: ICurrentDay;
  mealsList: IMeal[];
  currentMeal: IMeal;
  foodItem: IFoodItem;
  isChangeMealNameVisible: boolean;
  isAddFoodItemVisible: boolean;
  isSelectFoodItemVisible: boolean;
  isClearModeActive: boolean;
  isViewMode: boolean;
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
  isClearModeActive: false,
  isViewMode: false,
};

const localMyDaySlice = createSlice({
  name: 'localMyDaySlice',
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
    // сохраняет изменения названия приёма пищи
    setMealName: (state, action: PayloadAction<string>) => {
      state.currentMeal.name = action.payload;
    },
    // сохранение выбранного продукта из базы знания
    setSelectedItemOne: (state, action: PayloadAction<BaseItem>) => {
      state.foodItem = {
        id: action.payload.id as number,
        userId: action.payload.userId as string,
        name: action.payload.name,
        calories: action.payload.calories,
        price: action.payload.price as number,
        weight: 0,
      };
    },
    // установка общего количества калорий с учётом добавленного продукта
    setTotalCalories: (state, action: PayloadAction<number>) => {
      state.currentMeal.totalCalories =
        state.currentMeal.totalCalories + action.payload;
    },
    // установка общего количества калорий с учётом удалённого продукта
    setTotalCaloriesMinus: (state, action: PayloadAction<number>) => {
      state.currentMeal.totalCalories =
        state.currentMeal.totalCalories - action.payload;
    },
    // установка общей цены приёма пищи с учётом добавленного продукта
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.currentMeal.totalPrice =
        (state.currentMeal.totalPrice as number) + action.payload;
    },
    // установка общей цены приёма пищи с учётом удалённого продукта
    setTotalPriceMinus: (state, action: PayloadAction<number>) => {
      state.currentMeal.totalPrice =
        (state.currentMeal.totalPrice as number) - action.payload;
    },
    // добавление выбранного из базы знания продукта в список продуктов приёма пищи с уже записанным весом
    addToFoodStuff: (state, action: PayloadAction<IFoodItem>) => {
      state.currentMeal.foodstuff = [
        ...state.currentMeal.foodstuff,
        action.payload,
      ];
    },
    // сброс выбора продукта из базы знания
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
    // сохранение приёма пищи в списке дневных приёмов пищи
    addToMealList: (state, action: PayloadAction<IMeal>) => {
      state.mealsList = [...state.mealsList, action.payload];
    },
    // удаление текущего приёма пищи и возврат предыдущего в статус текущего
    deleteNexEmptyCurrentMeal: (state) => {
      const temp = state.mealsList.pop();
      state.currentMeal = temp as IMeal;
    },
    // сброс текущего приёма пищи к начальным значениям
    resetCurrentMeal: (state) => {
      state.currentMeal = {
        name: 'Приём пищи',
        foodstuff: [],
        totalCalories: 0,
        totalPrice: 0,
      };
    },
    // установка флага активности режима удаление продуктов из списка приёма пищи
    setClearActiveMode: (state, action: PayloadAction<boolean>) => {
      state.isClearModeActive = action.payload;
    },
    // удаление продукта из спика приёма пищи
    clearMealFoodstuffItem: (state, action: PayloadAction<number>) => {
      state.currentMeal.foodstuff = state.currentMeal.foodstuff.filter(
        (item) => item.id !== action.payload
      );
    },
    setViewMode: (state) => {
      state.isViewMode = !state.isViewMode;
    },
  },
});

const { actions, reducer } = localMyDaySlice;
export default reducer;
export const {
  setChangeMealNameVisible,
  setAddFoodItemVisible,
  setSelectFoodItemVisible,
  setSelectedItemOne,
  setTotalCalories,
  setTotalCaloriesMinus,
  setTotalPrice,
  setTotalPriceMinus,
  setMealName,
  addToFoodStuff,
  resetCurrenFoodItem,
  addToMealList,
  resetCurrentMeal,
  setClearActiveMode,
  clearMealFoodstuffItem,
  deleteNexEmptyCurrentMeal,
  setViewMode,
} = actions;
