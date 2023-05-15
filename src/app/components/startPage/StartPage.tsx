import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../hooks/reduxHooks';
import {
  appBurgerMenuActive,
  changePageName,
} from '../../../redux/slices/headerSlice';

import './start-page.scss';

const StartPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changePageName('startScreen'));
    dispatch(appBurgerMenuActive(false));
    // eslint-disable-next-line
  }, []);

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
              to={'/knowledgebase'}
            >
              База Знаний
            </Link>
            <Link className='start-page__btn' to={'/statistic'}>
              Статистика
            </Link>
          </div>
          <div className='start-page__buttons-box-right'>
            <Link className='start-page__btn' to={'/myday'}>
              Мой день
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
