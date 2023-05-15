import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';

import { setChangeMealNameVisible } from '../../../../redux/slices/myDaySlice';
import MealFoodItem from '../mealFoodItem/MealFoodItem';

import { IMeal } from '../../../../models/modelTypes';

import './meal.scss';

interface IMealProps {
  meal: IMeal;
}

const Meal: FC<IMealProps> = (props) => {
  const dispatch = useAppDispatch();
  // const currentMealName = useAppSelector(
  //   (store) => store.localMyDaySlice.currentMeal.name
  // );
  const handleVisible = () => {
    dispatch(setChangeMealNameVisible(true));
  };

  const { name, foodstuff, totalCalories, totalPrice } = props.meal;

  return (
    <div className='meal'>
      <div className='meal__header-block'>
        <div className='meal__name'>{name}</div>
        <span className='meal__name-change-btn' onClick={handleVisible}></span>
      </div>
      <ul className='meal__food-item-list'>
        {foodstuff.map((item, i) => {
          return item ? <MealFoodItem key={i} foodItem={item} /> : null;
        })}
      </ul>
      <div className='meal__food-item-add'></div>
      <div className='meal__res'>
        <span className='meal__res-label'>Общие значения:</span>
        <span className='meal__res-calories'>{totalCalories}</span>
        <span className='meal__res-price'>{totalPrice}</span>
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
