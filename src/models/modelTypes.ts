interface BaseItem {
  id?: number;
  userId?: string;
  name: string;
  calories: number;
  price?: number;
}

interface IBaseItem {
  id?: number;
  userId?: string;
  name: string;
  calories: number;
  price?: number;
}

interface IDataBaseItem {
  id: number;
  userId: string;
  name: string;
  calories: number;
  price: number;
}

interface IFoodItem extends IDataBaseItem {
  weight: number;
}

interface IMeal {
  name: string;
  foodstuff: IFoodItem[];
  totalCalories: number;
  totalPrice?: number;
}

interface ICurrentDay {
  date: string;
  meals: IMeal[];
}

interface IMyDayResult {
  date: string;
  totalCalories: number;
  totalPrice: number;
  userid: string;
}

interface IDataUser {
  id: number;
  userId: string;
  nickname: string;
  password: string;
}

type TypeActiveTab = 'food' | 'set' | 'recipe';

export type {
  BaseItem,
  IBaseItem,
  IDataBaseItem,
  IFoodItem,
  IMeal,
  ICurrentDay,
  IMyDayResult,
  IDataUser,
  TypeActiveTab,
};
