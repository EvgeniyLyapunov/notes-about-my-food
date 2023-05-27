import { ICurrentDay } from '../models/modelTypes';

export const createMyDayForDB = (
  currentDay: ICurrentDay,
  userid: string
): string => {
  const dayForDB = {
    date: currentDay.date,
    totalCalories: currentDay.meals.reduce(
      (acc, item) => acc + item.totalCalories,
      0
    ),
    totalPrice: currentDay.meals.reduce(
      (acc, item) => acc + (item.totalPrice as number),
      0
    ),
    userid: userid,
  };
  return JSON.stringify(dayForDB);
};
