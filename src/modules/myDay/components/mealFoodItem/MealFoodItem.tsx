import { FC } from 'react';
import classNames from 'classnames';

import { IFoodItem } from '../../../../models/modelTypes';

import './meal-food-item.scss';

interface IFoodItemProps {
  foodItem: IFoodItem;
  zebra: boolean;
}

const MealFoodItem: FC<IFoodItemProps> = (props) => {
  const { name, weight, calories } = props.foodItem;
  const MealFoodItemClasses = classNames({
    'food-item': true,
    'food-item_zebra': props.zebra,
  });
  return (
    <div className={MealFoodItemClasses}>
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
