import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reduxHooks';
import classNames from 'classnames';

import FoodItemOne from '../foodItemOne/FoodItemOne';
import { setSelectFoodItemVisible } from '../../../../redux/slices/myDaySlice';
import { BaseItem } from '../../../../models/modelTypes';

import './select-food-item-modal.scss';

interface IFoodItemListProps {
  list: BaseItem[];
}
const SelectFoodItemModal: FC<IFoodItemListProps> = ({ list }) => {
  let listForSort = [...list];

  if (listForSort && listForSort.length > 2) {
    listForSort.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  const isVisible = useAppSelector(
    (state) => state.localMyDaySlice.isSelectFoodItemVisible
  );

  const selectClasses = classNames({
    'select-food-item': true,
    'select-food-item_active': isVisible,
  });

  const dispatch = useAppDispatch();

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
      </div>
    </div>
  );
};

export default SelectFoodItemModal;
