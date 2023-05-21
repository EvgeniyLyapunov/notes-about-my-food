import { FC } from 'react';

import { BaseItem } from '../../../../models/modelTypes';
import BaseListItem from '../baseListItem/BaseListItem';

import { sortList } from '../../../../utils/sortList';

import './base-list.scss';

interface IBaseListProps {
  items: BaseItem[];
}

const BaseList: FC<IBaseListProps> = (props) => {
  let { items } = props;

  let listForSort = [...items];

  if (listForSort && listForSort.length > 1) {
    sortList(listForSort);
    items = listForSort;
  }

  return (
    <div className='base-list'>
      {items
        ? items.map((item, i) => {
            const zebra = i % 2 === 0 ? true : false;
            return (
              <BaseListItem
                key={i}
                id={item.id as number}
                name={item.name}
                calories={item.calories}
                price={item.price}
                zebra={zebra}
              />
            );
          })
        : null}
    </div>
  );
};

export default BaseList;
