import { FC } from 'react';

import { useAppSelector } from '../../../hooks/reduxHooks';

import StartMenu from '../startMenu/StartMenu';
import StartMenuBurger from '../startMenuBurger/StartMenuBurger';
import AppMenu from '../appMenu/AppMenu';
import AppMenuBurger from '../appMenuBurger/AppMenuBurger';

import './header.scss';

const Header: FC = () => {
  const nameActivePage = useAppSelector((state) => state.headerSlice.pageName);

  return (
    <div className='header'>
      {nameActivePage === 'startScreen' ? (
        <StartHeader />
      ) : (
        <AppHeader nameActivePage={nameActivePage} />
      )}
    </div>
  );
};

const StartHeader: FC = () => {
  return (
    <>
      <div className='header__logo-box'></div>
      <StartMenu />
      <StartMenuBurger />
    </>
  );
};

interface INameActivePage {
  nameActivePage: string;
}

const AppHeader: FC<INameActivePage> = ({ nameActivePage }) => {
  return (
    <>
      <div className='header__name-box'>{nameActivePage}</div>
      <AppMenu />
      <AppMenuBurger />
    </>
  );
};

export default Header;
