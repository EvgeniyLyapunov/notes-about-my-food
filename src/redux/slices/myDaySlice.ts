import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFoodItem, IMeal, ICurrentDay } from '../../models/modelTypes';

interface IMyDay {
  currentDay: ICurrentDay;
  mealsList: IMeal[];
  foodItem: IFoodItem;
}

const initialState: IMyDay = {
  currentDay: {
    date: '',
    meals: [],
  },
  mealsList: [
    {
      name: 'Приём пищи',
      foodstuff: [],
      totalCalories: 0,
      totalPrice: 0,
    },
  ],
  foodItem: {
    id: 0,
    userId: '',
    name: '',
    calories: 0,
    price: 0,
    weight: 0,
  },
};

const localMyDaySlice = createSlice({
  name: 'localMyDaySlice',
  initialState,
  reducers: {},
});

const { actions, reducer } = localMyDaySlice;
export default reducer;
export const {} = actions;
