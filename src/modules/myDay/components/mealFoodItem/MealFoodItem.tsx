import { FC } from 'react';

import { IFoodItem } from '../../../../models/modelTypes';

import './meal-food-item.scss';

interface IFoodItemProps {
  foodItem: IFoodItem;
}

const MealFoodItem: FC<IFoodItemProps> = (props) => {
  const { name, weight, calories } = props.foodItem;
  return (
    <div className='food-item'>
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
