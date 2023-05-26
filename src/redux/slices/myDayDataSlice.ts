import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  BaseItem,
  IFoodItem,
  IMeal,
  ICurrentDay,
} from '../../models/modelTypes';

interface IMyDayData {
  currentDay: ICurrentDay;
  mealsList: IMeal[];
  currentMeal: IMeal;
  foodItem: IFoodItem;
}

const initialState: IMyDayData = {
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
};

const myDayDataSlice = createSlice({
  name: 'myDayDataSlice',
  initialState,
  reducers: {
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
    // удаление продукта из спика приёма пищи
    clearMealFoodstuffItem: (state, action: PayloadAction<number>) => {
      state.currentMeal.foodstuff = state.currentMeal.foodstuff.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

const { actions, reducer } = myDayDataSlice;
export default reducer;
export const {
  setMealName,
  setSelectedItemOne,
  setTotalCalories,
  setTotalCaloriesMinus,
  setTotalPrice,
  setTotalPriceMinus,
  addToFoodStuff,
  resetCurrenFoodItem,
  addToMealList,
  deleteNexEmptyCurrentMeal,
  resetCurrentMeal,
  clearMealFoodstuffItem,
} = actions;
