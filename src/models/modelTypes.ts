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

// type BaseSet = {
//   [key: string]: BaseItem;
// };

// type BaseRecipe = {
//   foodSet: FoodSet;
//   description: string;
// };

// type FoodSet = {
//   [key: string]: FoodItem;
// };

export type {
  BaseItem,
  IBaseItem,
  // BaseSet,
  // BaseRecipe,
  IDataBaseItem,
  IFoodItem,
  // FoodSet,
  IMeal,
  ICurrentDay,
};
