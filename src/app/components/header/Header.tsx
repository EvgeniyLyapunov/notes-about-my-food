import { FC } from 'react';

import { useAppSelector } from '../../../hooks/reduxHooks';

import StartMenu from '../startMenu/StartMenu';
import StartMenuBurger from '../startMenuBurger/StartMenuBurger';
import AppMenu from '../appMenu/AppMenu';
import AppMenuBurger from '../appMenuBurger/AppMenuBurger';

import './header.scss';

const Header: FC = () => {
  const nameActivePage = useAppSelector((state) => state.headerSlice.pageName);
  const nickname = useAppSelector((state) => state.authSlice.user?.nickname);
  return (
    <div className='header'>
      {nameActivePage === 'startScreen' ? (
        <StartHeader nickname={nickname as string} />
      ) : (
        <AppHeader nameActivePage={nameActivePage} />
      )}
    </div>
  );
};

interface IStartUserHeaderProps {
  nickname: string;
}

const StartHeader: FC<IStartUserHeaderProps> = ({ nickname }) => {
  return (
    <>
      {nickname ? (
        <div className='header__user-box'>
          <span>{nickname}</span>
        </div>
      ) : (
        <div className='header__logo-box'></div>
      )}
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
