import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import classNames from 'classnames';

import {
  addToMealList,
  resetCurrentMeal,
  deleteNexEmptyCurrentMeal,
} from '../../../../redux/slices/myDayDataSlice';

import {
  setChangeMealNameVisible,
  setAddFoodItemVisible,
  setClearActiveMode,
} from '../../../../redux/slices/myDayViewSlice';

import MealFoodItem from '../mealFoodItem/MealFoodItem';

import { IMeal } from '../../../../models/modelTypes';

import { sortList } from '../../../../utils/sortList';

import './meal.scss';

interface IMealProps {
  meal: IMeal;
}

const Meal: FC<IMealProps> = (props) => {
  const dispatch = useAppDispatch();
  const mealList = useAppSelector(
    (state) => state.myDayDataSlice.currentDay.meals
  );
  const isViewMode = useAppSelector((state) => state.myDayViewSlice.isViewMode);

  const { name, foodstuff, totalCalories, totalPrice } = props.meal;

  let listForSort = [...foodstuff];
  if (listForSort.length > 1) {
    sortList(listForSort);
  }

  const isClearModeActive = useAppSelector(
    (state) => state.myDayViewSlice.isClearModeActive
  );
  const handleChangeNameVisible = () => {
    dispatch(setChangeMealNameVisible(true));
  };

  const handleAddFoodItemVisible = () => {
    dispatch(setAddFoodItemVisible(true));
  };

  const handleClearActive = () => {
    if (isClearModeActive) {
      dispatch(setClearActiveMode(false));
    } else {
      dispatch(setClearActiveMode(true));
    }
  };

  const handleEndMeal = () => {
    if (foodstuff.length > 0) {
      dispatch(addToMealList(JSON.parse(JSON.stringify(props.meal))));
      dispatch(resetCurrentMeal());
    }
  };

  const handleDeleteMeal = () => {
    dispatch(deleteNexEmptyCurrentMeal());
  };

  const clearClasses = classNames({
    meal__btn: true,
    'meal__btn-clear': true,
    'meal__btn-clear_active': isClearModeActive,
  });

  return (
    <div className='meal'>
      <div className='meal__header-block'>
        <div className='meal__name'>{name}</div>
        {!isViewMode ? (
          <span
            className='meal__name-change-btn'
            onClick={handleChangeNameVisible}
          ></span>
        ) : null}
      </div>
      <ul className='meal__food-item-list'>
        {listForSort.map((item, i) => {
          const zebra = i % 2 === 0 ? true : false;
          return item ? (
            <MealFoodItem key={i} foodItem={item} zebra={zebra} />
          ) : null;
        })}
      </ul>
      {!isViewMode ? (
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
      {!isViewMode ? (
        <div className='meal__buttons-block'>
          {mealList.length > 0 && !isViewMode ? (
            <button
              className='meal__btn meal__btn-delete'
              onClick={handleDeleteMeal}
            ></button>
          ) : (
            <button className='meal__btn meal__btn_empty'></button>
          )}
          <button className={clearClasses} onClick={handleClearActive}></button>
          <button
            className='meal__btn meal__btn-end'
            onClick={handleEndMeal}
          ></button>
        </div>
      ) : null}
    </div>
  );
};

export default Meal;
