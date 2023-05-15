import { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { appBurgerMenuActive } from '../../../redux/slices/headerSlice';

import './app-burger.scss';

const AppMenuBurger: FC = () => {
  const isBurgerActive = useAppSelector(
    (store) => store.headerSlice.isAppBurgerActive
  );
  const [burgerActive, setBurgerActive] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setBurgerActive(isBurgerActive);
  }, [isBurgerActive]);

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
