import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  appBurgerMenuActive,
  changePageName,
  setPageFrom,
  setStartBurgerMenuVisible,
} from '../../../redux/slices/headerSlice';
import {
  setLoginViewVisible,
  setRegViewVisible,
} from '../../../redux/slices/AuthSlice';

import './start-page.scss';

const StartPage: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authSlice.user);
  useEffect(() => {
    dispatch(changePageName('startScreen'));
    dispatch(setPageFrom('startScreen'));
    dispatch(appBurgerMenuActive(false));
    dispatch(setStartBurgerMenuVisible(false));
    dispatch(setLoginViewVisible(false));
    dispatch(setRegViewVisible(false));
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div className='start-page'>
      <div className='start-page__container'>
        <div className='start-page__title-box'>
          <span className='start-page__title start-page__title-notes'>
            Notes
          </span>
          <span className='start-page__title start-page__title-about'>
            About
          </span>
          <span className='start-page__title start-page__title-my'>My</span>
          <span className='start-page__title start-page__title-food'>Food</span>
        </div>
        <div className='start-page__buttons-box'>
          <div className='start-page__buttons-box-left'>
            <Link
              className='start-page__btn start-page__btn_mb'
              to={user ? '/knowledgebase' : '/auth'}
            >
              База Знаний
            </Link>
            <Link
              className='start-page__btn'
              to={user ? '/statistic' : '/auth'}
            >
              Статистика
            </Link>
          </div>
          <div className='start-page__buttons-box-right'>
            <Link className='start-page__btn' to={user ? '/myday' : '/auth'}>
              Мой день
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
