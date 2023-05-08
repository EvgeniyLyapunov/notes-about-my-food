import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../hooks/reduxHooks';

import './start-menu.scss';

const StartMenu: FC = () => {
  const isMenuActive = useAppSelector(
    (state) => state.headerSlice.isStartBurgerActive
  );
  const startMenuClasses = classNames({
    'start-menu': true,
    'start-menu_active': isMenuActive,
  });
  return (
    <ul className={startMenuClasses}>
      <li>
        <Link className='start-menu__link' to={'/auth'}>
          Авторизация
        </Link>
      </li>
      <li>
        <Link className='start-menu__link' to={'/usersguide'}>
          Руководство
        </Link>
      </li>
      <li>
        <Link className='start-menu__link' to={'/about'}>
          О проекте
        </Link>
      </li>
    </ul>
  );
};

export default StartMenu;
