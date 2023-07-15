import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reduxHooks';
import classNames from 'classnames';

import FoodItemOne from '../foodItemOne/FoodItemOne';
import { setSelectFoodItemVisible } from '../../../../redux/slices/myDayViewSlice';
import { IDataBaseItem } from '../../../../models/modelTypes';

import { sortList } from '../../../../utils/sortList';

import './select-food-item-modal.scss';

interface IFoodItemListProps {
  list: IDataBaseItem[];
}
const SelectFoodItemModal: FC<IFoodItemListProps> = ({ list }) => {
  const dispatch = useAppDispatch();

  let listForSort = [...list];

  if (listForSort && listForSort.length > 2) {
    sortList(listForSort);
  }

  const isVisible = useAppSelector(
    (state) => state.myDayViewSlice.isSelectFoodItemVisible
  );
  const selectClasses = classNames({
    'select-food-item': true,
    'select-food-item_active': isVisible,
  });

  const handleClose = () => {
    dispatch(setSelectFoodItemVisible(false));
  };

  return (
    <div className={selectClasses}>
      <div className='select-food-item__window select'>
        <h3 className='select__title'>Выбор из Базы Знаний:</h3>
        {listForSort.length > 0 ? (
          <ul className='select__list'>
            {listForSort
              ? listForSort.map((item, i) => {
                  const zebra = i % 2 === 0 ? true : false;
                  return <FoodItemOne key={i} itemOne={item} zebra={zebra} />;
                })
              : null}
          </ul>
        ) : (
          <div className='select__empty'>
            <span className='select__empty-text'>База Знаний пуста!</span>
            <span className='select__empty-cansel' onClick={handleClose}></span>
          </div>
        )}
        {listForSort ? (
          <div className='select__cansel'>
            <span className='select__cansel-btn' onClick={handleClose}></span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SelectFoodItemModal;
