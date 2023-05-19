import { FC } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import {
  setSelectedItemOne,
  setSelectFoodItemVisible,
} from '../../../../redux/slices/myDaySlice';

import { BaseItem } from '../../../../models/modelTypes';

import './food-item-one.scss';

interface IFoodItemOneProps {
  itemOne: BaseItem;
  zebra: boolean;
}

const FoodItemOne: FC<IFoodItemOneProps> = (props) => {
  const { name, calories, price } = props.itemOne;
  const dispatch = useAppDispatch();
  const handleSelectThis = (item: BaseItem) => {
    dispatch(setSelectedItemOne(item));
    dispatch(setSelectFoodItemVisible(false));
  };
  const foodItemOneClasses = classNames({
    'food-item-one': true,
    'food-item-one_zebra': props.zebra,
  });
  return (
    <li
      className={foodItemOneClasses}
      onClick={() => handleSelectThis(props.itemOne)}
    >
      <span className='food-item-one__name'>{name}</span>
      <div className='food-item-one__nums'>
        <span className='food-item-one__num food-item-one__num-calories'>
          {calories}
        </span>
        <span className='food-item-one__num food-item-one__num-price'>
          {price}
        </span>
      </div>
    </li>
  );
};

export default FoodItemOne;
