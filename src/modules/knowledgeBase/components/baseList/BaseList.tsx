import { FC } from 'react';
import { useAppSelector } from '../../../../hooks/reduxHooks';

import { BaseItem } from '../../../../models/modelTypes';
import BaseListItem from '../baseListItem/BaseListItem';

import './base-list.scss';

const BaseList: FC = () => {
  const dataList = useAppSelector(
    (store) => store.knowledgeBaseSlice.baseItemsList
  );

  const dataListView = dataList.map((item) => {
    return (
      <BaseListItem
        key={item.id}
        name={item.name}
        calories={item.calories}
        price={item.price}
      />
    );
  });
  return <div className='base-list'>{dataListView}</div>;
};

export default BaseList;
