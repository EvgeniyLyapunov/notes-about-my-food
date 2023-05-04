import { FC, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch } from '../../../hooks/hooks';
import { burgerMenuActive } from '../../../redux/slices/startScreenSlice';

import './start-burger.scss';

const StartMenuBurger: FC = () => {
  const [burgerActive, setBurgerActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleBurgerActive = (): void => {
    setBurgerActive(!burgerActive);
    dispatch(burgerMenuActive());
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
