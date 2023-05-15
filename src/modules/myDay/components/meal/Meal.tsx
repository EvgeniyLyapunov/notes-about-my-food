import { FC } from 'react';

import MealFoodItem from '../mealFoodItem/MealFoodItem';

import './meal.scss';

const Meal: FC = () => {
  return (
    <div className='meal'>
      <div className='meal__header-block'>
        <div className='meal__name'>Приём пищи</div>
        <span className='meal__name-change-btn'></span>
      </div>
      <ul className='meal__food-item-list'></ul>
      <div className='meal__food-item-add'></div>
      <div className='meal__res'>
        <span className='meal__res-label'>Общие значения:</span>
        <span className='meal__res-calories'></span>
        <span className='meal__res-price'></span>
      </div>
      <div className='meal__buttons-block'>
        <button className='meal__btn meal__btn_delete'></button>
        <button className='meal__btn meal__btn_clear'></button>
        <button className='meal__btn meal__btn_save'></button>
        <button className='meal__btn meal__btn_end'></button>
      </div>
    </div>
  );
};

export default Meal;
