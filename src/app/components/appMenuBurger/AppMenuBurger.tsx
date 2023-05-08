import { FC, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch } from '../../../hooks/reduxHooks';
import { appBurgerMenuActive } from '../../../redux/slices/headerSlice';

import './app-burger.scss';

const AppMenuBurger: FC = () => {
  const [burgerActive, setBurgerActive] = useState(false);
  const dispatch = useAppDispatch();

  const handleBurgerActive = (): void => {
    setBurgerActive(!burgerActive);
    dispatch(appBurgerMenuActive(!burgerActive));
  };

  const appBurgerClasses = classNames({
    active: burgerActive,
  });

  return (
    <div className='app-burger' onClick={handleBurgerActive}>
      <span className={appBurgerClasses}></span>
    </div>
  );
};

export default AppMenuBurger;
