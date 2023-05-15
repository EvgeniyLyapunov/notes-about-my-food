import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../hooks/reduxHooks';

import './app-menu.scss';

type AppMenuListVisible = {
  myday: boolean;
  knowledgeBase: boolean;
  statistic: boolean;
  usersguide: boolean;
};

const AppMenu: FC = () => {
  const appMenuListVisible: AppMenuListVisible = {
    myday: false,
    knowledgeBase: false,
    statistic: false,
    usersguide: false,
  };

  const [hideItem, setHideItem] = useState(appMenuListVisible);

  const isMenuActive = useAppSelector(
    (state) => state.headerSlice.isAppBurgerActive
  );

  const currentPage = useAppSelector(
    (state) => state.headerSlice.hideActivePageLink
  );

  useEffect(() => {
    let k: keyof typeof appMenuListVisible;
    for (k in appMenuListVisible) {
      if (k.toString() === currentPage) {
        appMenuListVisible[k] = true;
      } else {
        appMenuListVisible[k] = false;
      }
    }
    setHideItem(appMenuListVisible);
    // eslint-disable-next-line
  }, [currentPage]);

  // console.log(hideItem);

  const appMenuClasses = classNames({
    'app-menu': true,
    'app-menu_active': isMenuActive,
  });

  const myDayHide = classNames({
    'app-menu__item': true,
    'app-menu__item_hide': hideItem.myday,
  });

  const knowledgebaseHide = classNames({
    'app-menu__item': true,
    'app-menu__item_hide': hideItem.knowledgeBase,
  });

  const statisticHide = classNames({
    'app-menu__item': true,
    'app-menu__item_hide': hideItem.statistic,
  });

  const usersguideHide = classNames({
    'app-menu__item': true,
    'app-menu__item_hide': hideItem.usersguide,
  });

  return (
    <ul className={appMenuClasses}>
      <li className='app-menu__item'>
        <Link className='start-menu__link' to={'/'}>
          Главная
        </Link>
      </li>
      <li className={myDayHide}>
        <Link className='start-menu__link' to={'/myday'}>
          Мой день
        </Link>
      </li>
      <li className={knowledgebaseHide}>
        <Link className='start-menu__link' to={'/knowledgebase'}>
          База Знаний
        </Link>
      </li>
      <li className={statisticHide}>
        <Link className='start-menu__link' to={'/statistic'}>
          Статистика
        </Link>
      </li>
      <li className={usersguideHide}>
        <Link className='start-menu__link' to={'/usersguide'}>
          Руководство
        </Link>
      </li>
    </ul>
  );
};

export default AppMenu;
