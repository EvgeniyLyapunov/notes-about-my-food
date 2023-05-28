import { FC } from 'react';

import ItemOfDaysList from '../itemOfDaysList/ItemOfDaysList';

import { IMyDayResult } from '../../../../models/modelTypes';

import './days-list.scss';

interface IDaysListProps {
  list: IMyDayResult[];
}

const DaysList: FC<IDaysListProps> = ({ list }) => {
  return (
    <div className='days-list'>
      {list
        ? list.map((item, i) => {
            const zebra = i % 2 === 0 ? true : false;
            return (
              <ItemOfDaysList
                key={i}
                zebra={zebra}
                date={item.date}
                calories={item.totalCalories}
                price={item.totalPrice}
              />
            );
          })
        : null}
    </div>
  );
};

export default DaysList;
