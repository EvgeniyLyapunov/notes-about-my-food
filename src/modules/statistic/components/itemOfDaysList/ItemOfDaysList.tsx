import { FC } from 'react';
import classNames from 'classnames';

import './item-of-list.scss';

interface IItemOfDaysListProps {
  zebra: boolean;
  date: string;
  calories: number;
  price: number;
}

const ItemOfDaysList: FC<IItemOfDaysListProps> = (props) => {
  const { date, calories, price, zebra } = props;

  const classesWithZebra = classNames({
    'item-of-list': true,
    'item-of-list_zebra': zebra,
  });

  return (
    <div className={classesWithZebra}>
      <span className='item-of-list__date'>{date}</span>
      <div className='item-of-list__nums-block'>
        <span className='item-of-list__num item-of-list__num-calories'>
          {calories}
        </span>
        <span className='item-of-list__num item-of-list__num-price'>
          {price}
        </span>
      </div>
    </div>
  );
};

export default ItemOfDaysList;
