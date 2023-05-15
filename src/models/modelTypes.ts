interface BaseItem {
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

// type BaseSet = {
//   [key: string]: BaseItem;
// };

// type BaseRecipe = {
//   foodSet: FoodSet;
//   description: string;
// };

interface IFoodItem extends IDataBaseItem {
  weight: number;
}

// type FoodSet = {
//   [key: string]: FoodItem;
// };

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

export type {
  BaseItem,
  // BaseSet,
  // BaseRecipe,
  IFoodItem,
  // FoodSet,
  IMeal,
  ICurrentDay,
};
