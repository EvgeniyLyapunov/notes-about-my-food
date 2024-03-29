import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  BaseItem,
  IFoodItem,
  IMeal,
  ICurrentDay,
} from '../../models/modelTypes';

import { postMyDay } from '../asyncThunks/postMyDay';

import {
  myDayLoadState,
  currentMealLoadState,
  clearMyDayLocalStorage,
} from '../../utils/browserStorage';

interface IMyDayData {
  currentDay: ICurrentDay;
  currentMeal: IMeal;
  foodItem: IFoodItem;
  sourceForSelect: 'food' | 'set';
  dataLoadingStatus: boolean;
  dataLoadingError: string | null;
  isError: boolean;
}

const initialState: IMyDayData = {
  currentDay: {
    date: new Date().toLocaleDateString(),
    meals: [],
  },
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
  sourceForSelect: 'food',
  dataLoadingStatus: false,
  dataLoadingError: null,
  isError: false,
};

const myDayDataSlice = createSlice({
  name: 'myDayDataSlice',
  initialState,
  reducers: {
    // инициализация данными из localStorage
    setDataFromLocalStorage: (state) => {
      state.currentDay = myDayLoadState() as ICurrentDay;
      state.currentMeal = currentMealLoadState() as IMeal;
    },
    // сохраняет изменения названия приёма пищи
    setMealName: (state, action: PayloadAction<string>) => {
      state.currentMeal.name = action.payload;
    },
    setSourseForSelect: (state, action: PayloadAction<'food' | 'set'>) => {
      state.sourceForSelect = action.payload;
    },
    // сохранение выбранного продукта из базы знания
    setSelectedItemOne: (state, action: PayloadAction<BaseItem>) => {
      state.foodItem = {
        id: action.payload.id as number,
        userId: action.payload.userId as string,
        name: action.payload.name,
        calories: action.payload.calories,
        price: action.payload.price as number,
        weight: state.sourceForSelect === 'food' ? 0 : 1,
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
      state.currentDay.meals = [...state.currentDay.meals, action.payload];
    },
    // удаление текущего приёма пищи и возврат предыдущего в статус текущего
    deleteNexEmptyCurrentMeal: (state) => {
      const temp = state.currentDay.meals.pop();
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
    // применяется при выходе пользователя из аккаунта
    resetMyDayToInitState: (state) => {
      resetCurrenFoodItem();
      resetCurrentMeal();
      state.currentDay = {
        date: new Date().toLocaleDateString(),
        meals: [],
      };
    },
    resetLoadingStatus: (state) => {
      state.dataLoadingStatus = false;
    },
    resetErrorStatus: (state) => {
      state.dataLoadingError = null;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postMyDay.pending, (state) => {
      state.dataLoadingStatus = true;
      state.dataLoadingError = null;
    });
    builder
      .addCase(postMyDay.fulfilled, (state) => {
        state.dataLoadingStatus = false;
        clearMyDayLocalStorage();
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.dataLoadingError = action.payload;
        state.dataLoadingStatus = false;
        state.isError = true;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = myDayDataSlice;
export default reducer;
export const {
  setDataFromLocalStorage,
  setMealName,
  setSourseForSelect,
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
  resetMyDayToInitState,
  resetLoadingStatus,
  resetErrorStatus,
} = actions;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
