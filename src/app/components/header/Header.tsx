import { FC } from 'react';

import StartMenu from '../startMenu/StartMenu';
import StartMenuBurger from '../startMenuBurger/StartMenuBurger';

import './header.scss';

const Header: FC = () => {
  return (
    <div className='header'>
      <div className='header__logo-box'></div>
      <StartMenu />
      <StartMenuBurger />
    </div>
  );
};

export default Header;
