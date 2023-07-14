import { FC } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { useAppDispatch } from '../../../../hooks/reduxHooks';

import {
  setEditItemModalVisible,
  setConfirmForDeleteModalVisible,
} from '../../../../redux/slices/dataViewSlice';
import {
  setBaseItemForEdit,
  setBaseItemIdForDelete,
} from '../../../../redux/slices/dataFoodSlice';
import {
  setSetsItemForEdit,
  setSetsIdForDelete,
} from '../../../../redux/slices/dataSetsSlice';

import './base-list-item.scss';

interface IBaseListItemProps {
  id: number;
  name: string;
  calories: string | number;
  price: string | number | undefined;
  zebra: boolean;
}

const BaseListItem: FC<IBaseListItemProps> = ({
  id,
  name,
  calories,
  price,
  zebra,
}) => {
  const dispatch = useAppDispatch();

  const activeTab = useAppSelector((store) => store.dataViewSlice.activeTab);

  const classesWithZebra = classNames({
    'base-list-item': true,
    'base-list-item_zebra': zebra,
  });

  const handleEditItem = () => {
    switch (activeTab) {
      case 'food':
        dispatch(setBaseItemForEdit(id));
        break;
      case 'set':
        dispatch(setSetsItemForEdit(id));
        break;
    }
    dispatch(setEditItemModalVisible());
  };

  const handleDeleteItem = () => {
    switch (activeTab) {
      case 'food':
        dispatch(setBaseItemIdForDelete(id));
        break;
      case 'set':
        dispatch(setSetsIdForDelete(id));
        break;
    }
    dispatch(setConfirmForDeleteModalVisible(true));
  };

  return (
    <div className={classesWithZebra}>
      <div className='base-list-item__infos'>
        <div className='base-list-item__name'>{name}</div>
        <div className='base-list-item__numbers-block'>
          <div className='base-list-item__numbers base-list-item__numbers_calories'>
            {calories}
          </div>
          {price && +price !== 0 ? (
            <div className='base-list-item__numbers base-list-item__numbers_price'>
              {price}
            </div>
          ) : null}
        </div>
      </div>
      <div className='base-list-item__btns'>
        <span
          className='base-list-item__button base-list-item__button_edit'
          onClick={handleEditItem}
        ></span>
        <span
          className='base-list-item__button base-list-item__button_delete'
          onClick={handleDeleteItem}
        ></span>
      </div>
    </div>
  );
};

export default BaseListItem;
