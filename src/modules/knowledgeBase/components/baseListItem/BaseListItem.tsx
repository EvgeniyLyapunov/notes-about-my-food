import { FC } from 'react';
import classNames from 'classnames';

import { useAppDispatch } from '../../../../hooks/reduxHooks';
import {
  setEditItemModalVisible,
  setConfirmForDeleteModalVisible,
} from '../../../../redux/slices/knowledgeBaseViewSlice';
import {
  setBaseItemForEdit,
  setBaseItemIdForDelete,
} from '../../../../redux/slices/knowledgeBaseDataSlice';

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
  const classesWithZebra = classNames({
    'base-list-item': true,
    'base-list-item_zebra': zebra,
  });

  const handleEditItem = () => {
    dispatch(setBaseItemForEdit(id));
    dispatch(setEditItemModalVisible());
  };

  const handleDeleteItem = () => {
    dispatch(setBaseItemIdForDelete(id));
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
