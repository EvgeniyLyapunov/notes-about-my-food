import { FC, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch } from '../../../hooks/reduxHooks';
import { startBurgerMenuActive } from '../../../redux/slices/headerSlice';

import './start-burger.scss';

const StartMenuBurger: FC = () => {
  const [burgerActive, setBurgerActive] = useState(false);
  const dispatch = useAppDispatch();

  const handleBurgerActive = (): void => {
    setBurgerActive(!burgerActive);
    dispatch(startBurgerMenuActive());
  };

  const startBurgerClasses = classNames({
    active: burgerActive,
  });

  return (
    <div className='start-burger' onClick={handleBurgerActive}>
      <span className={startBurgerClasses}></span>
    </div>
  );
};

export default StartMenuBurger;
