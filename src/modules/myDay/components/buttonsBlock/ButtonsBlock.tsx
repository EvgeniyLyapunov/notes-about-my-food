import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import classNames from 'classnames';

import { setViewMode } from '../../../../redux/slices/myDayViewSlice';

import './buttons-block.scss';

const ButtonsBlock: FC = () => {
  const dispatch = useAppDispatch();
  const isViewMode = useAppSelector((state) => state.myDayViewSlice.isViewMode);
  const mealList = useAppSelector((state) => state.myDayDataSlice.mealsList);

  const handleCangeViewMode = (): void => {
    dispatch(setViewMode());
  };

  const buttonClasses = classNames({
    'buttons-block__btn': true,
    'buttons-block__btn_disabled': mealList.length > 0 ? false : true,
  });

  return (
    <div className='buttons-block'>
      <Link className='buttons-block__btn' to={'/'}>
        Назад
      </Link>
      <button
        className={buttonClasses}
        onClick={handleCangeViewMode}
        disabled={mealList.length > 0 ? false : true}
      >
        {isViewMode ? 'Редактор' : 'Просмотр'}
      </button>
    </div>
  );
};

export default ButtonsBlock;
