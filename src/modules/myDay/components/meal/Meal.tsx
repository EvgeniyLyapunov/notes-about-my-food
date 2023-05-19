import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';

import {
  setChangeMealNameVisible,
  setAddFoodItemVisible,
} from '../../../../redux/slices/myDaySlice';
import MealFoodItem from '../mealFoodItem/MealFoodItem';

import { IMeal } from '../../../../models/modelTypes';

import './meal.scss';

interface IMealProps {
  meal: IMeal;
  current: boolean;
}

const Meal: FC<IMealProps> = (props) => {
  const dispatch = useAppDispatch();

  const handleChangeNameVisible = () => {
    dispatch(setChangeMealNameVisible(true));
  };

  const handleAddFoodItemVisible = () => {
    dispatch(setAddFoodItemVisible(true));
  };

  const mealList = useAppSelector((state) => state.localMyDaySlice.mealsList);

  const { name, foodstuff, totalCalories, totalPrice } = props.meal;

  return (
    <div className='meal'>
      <div className='meal__header-block'>
        <div className='meal__name'>{name}</div>
        {props.current ? (
          <span
            className='meal__name-change-btn'
            onClick={handleChangeNameVisible}
          ></span>
        ) : null}
      </div>
      <ul className='meal__food-item-list'>
        {foodstuff.map((item, i) => {
          const zebra = i % 2 === 0 ? true : false;
          return item ? (
            <MealFoodItem key={i} foodItem={item} zebra={zebra} />
          ) : null;
        })}
      </ul>
      {props.current ? (
        <div
          className='meal__food-item-add'
          onClick={handleAddFoodItemVisible}
        ></div>
      ) : null}
      <div className='meal__res'>
        <span className='meal__res-label'>Общие значения:</span>
        <span className='meal__res-calories'>{totalCalories}</span>
        <span className='meal__res-price'>{totalPrice}</span>
      </div>
      <div className='meal__buttons-block'>
        {mealList.length > 1 ? (
          <button className='meal__btn meal__btn_delete'></button>
        ) : (
          <button className='meal__btn meal__btn_empty'></button>
        )}
        <button className='meal__btn meal__btn_clear'></button>
        <button className='meal__btn meal__btn_save'></button>
        <button className='meal__btn meal__btn_end'></button>
      </div>
    </div>
  );
};

export default Meal;
