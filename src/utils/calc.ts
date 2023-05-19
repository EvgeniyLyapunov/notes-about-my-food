// функция возвращает количество калорий исходя из веса и значения калорий продукта на 100 грамм
const caloriesCalc = (foodItemCalories: number, weight: number): number => {
  return Math.floor((foodItemCalories * weight) / 100);
};
// функция возвращает цену продукта исходя из веса и значения цены продукта за 100 грамм
const priceCalc = (foodItemPrice: number, weight: number): number => {
  return Math.floor((foodItemPrice * weight) / 100);
};
// функция возращает цену за 100 грамм продукта
// аргументы - цена за товара и вес товара в граммах
const basePriceCalc = (
  totalPriceOfProduct: number,
  totalWeightOfProduct: number
): number => {
  return Math.floor((totalPriceOfProduct * 100) / totalWeightOfProduct);
};

export { caloriesCalc, priceCalc, basePriceCalc };
