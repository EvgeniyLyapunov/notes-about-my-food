import { FC } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';

import { IFoodItem } from '../../../../models/modelTypes';
import {
  clearMealFoodstuffItem,
  setClearActiveMode,
  setTotalCaloriesMinus,
  setTotalPriceMinus,
} from '../../../../redux/slices/myDaySlice';

import './meal-food-item.scss';

interface IFoodItemProps {
  foodItem: IFoodItem;
  zebra: boolean;
}

const MealFoodItem: FC<IFoodItemProps> = (props) => {
  const dispatch = useAppDispatch();
  const isClearModeActive = useAppSelector(
    (state) => state.localMyDaySlice.isClearModeActive
  );
  const handleClearItem = (id: number): void => {
    if (isClearModeActive) {
      dispatch(setTotalCaloriesMinus(props.foodItem.calories));
      dispatch(setTotalPriceMinus(props.foodItem.price));
      dispatch(clearMealFoodstuffItem(id));
      dispatch(setClearActiveMode(false));
    }
  };
  const { name, weight, calories, id } = props.foodItem;
  const MealFoodItemClasses = classNames({
    'food-item': true,
    'food-item_zebra': props.zebra,
  });
  return (
    <div className={MealFoodItemClasses} onClick={() => handleClearItem(id)}>
      <span className='food-item__name'>{name}</span>
      <div className='food-item__nums-block'>
        <span className='food-item__num food-item__num-weight'>{weight}</span>
        <span className='food-item__num food-item__num-calories'>
          {calories}
        </span>
      </div>
    </div>
  );
};

export default MealFoodItem;
