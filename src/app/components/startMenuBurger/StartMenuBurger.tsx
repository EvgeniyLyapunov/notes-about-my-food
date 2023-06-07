import { FC } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { startBurgerMenuActive } from '../../../redux/slices/headerSlice';

import './start-burger.scss';

const StartMenuBurger: FC = () => {
  const dispatch = useAppDispatch();
  const isBurgerActive = useAppSelector(
    (state) => state.headerSlice.isStartBurgerActive
  );
  const isBurgerNone = useAppSelector(
    (state) => state.headerSlice.isStartBurgerNone
  );
  const handleBurgerActive = (): void => {
    dispatch(startBurgerMenuActive(!isBurgerActive));
  };

  const startBurgerClasses = classNames({
    active: isBurgerActive,
  });

  const startBurgerDisplayClasses = classNames({
    'start-burger': true,
    'start-burger_none': isBurgerNone,
  });

  return (
    <div className={startBurgerDisplayClasses} onClick={handleBurgerActive}>
      <span className={startBurgerClasses}></span>
    </div>
  );
};

export default StartMenuBurger;
