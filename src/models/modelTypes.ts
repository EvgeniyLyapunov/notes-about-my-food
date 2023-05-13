interface BaseItem {
  id?: number;
  userId?: string;
  name: string;
  calories: number;
  price?: number;
}

type BaseSet = {
  [key: string]: BaseItem;
};

type BaseRecipe = {
  foodSet: FoodSet;
  description: string;
};

type FoodItem = BaseItem & {
  weight: number;
};

type FoodSet = {
  [key: string]: FoodItem;
};

type Meal = {
  name: string;
  foodstuff: FoodSet[];
};

type CurrentDay = {
  date: string;
  meals: Meal[];
};

export type {
  BaseItem,
  BaseSet,
  BaseRecipe,
  FoodItem,
  FoodSet,
  Meal,
  CurrentDay,
};
