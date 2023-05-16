import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reduxHooks';
import classNames from 'classnames';

import { BaseItem } from '../../../../models/modelTypes';

import './select-food-item-modal.scss';

interface IFoodItemListProps {
  list: BaseItem[];
}
const SelectFoodItemModal: FC<IFoodItemListProps> = ({ list }) => {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector(
    (state) => state.localMyDaySlice.isSelectFoodItemVisible
  );

  const selectClasses = classNames({
    'select-food-item': true,
    'select-food-item_active': isVisible,
  });
  return (
    <div className={selectClasses}>
      <div className='select-food-item__window select'>
        <h3 className='select__title'>Выбор из Базы Знаний:</h3>
        <ul className='select__list'>{/* {list ? list.map()} */}</ul>
      </div>
    </div>
  );
};

export default SelectFoodItemModal;
