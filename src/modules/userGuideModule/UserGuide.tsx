import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { Link } from 'react-router-dom';

import StarterUserGuide from './starterUG/StarterUserGuide';
import KnowledgeBaseUserGuide from './knowledgeBaseUG/KnowledgeBaseUserGuide';
import MyDayUserGuide from './myDayUG/MyDayUserGuide';
import StatisticUserGuide from './statisticUG/StatisticUserGuide';

import {
  appBurgerMenuActive,
  startBurgerMenuActive,
  changePageName,
  hidingActivePageLink,
} from '../../redux/slices/headerSlice';

import './user-guide.scss';

const UserGuide: FC = () => {
  const dispatch = useAppDispatch();

  const pageFrom = useAppSelector((state) => state.headerSlice.pageFrom);

  useEffect(() => {
    dispatch(hidingActivePageLink('usersguide'));
    dispatch(changePageName('Руководство'));
    dispatch(appBurgerMenuActive(false));
    dispatch(startBurgerMenuActive());
    return () => {
      dispatch(appBurgerMenuActive(false));
    };
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    dispatch(appBurgerMenuActive(false));
  };

  return (
    <div className='user-guide'>
      <div className='user-guide__book'>
        {pageFrom === 'startScreen' ? (
          <>
            <StarterUserGuide />
            <KnowledgeBaseUserGuide />
            <MyDayUserGuide />
            <StatisticUserGuide />
          </>
        ) : null}
        {pageFrom === 'База знаний' ? (
          <>
            <KnowledgeBaseUserGuide />
          </>
        ) : null}
        {pageFrom === 'Мой день' ? (
          <>
            <MyDayUserGuide />
          </>
        ) : null}
        {pageFrom === 'Статистика' ? (
          <>
            <StatisticUserGuide />
          </>
        ) : null}
      </div>
      <div className='user-guide__buttons-block'>
        <Link
          className='user-guide__button-close'
          to={'/'}
          onClick={handleClose}
        >
          Закрыть
        </Link>
      </div>
    </div>
  );
};

export default UserGuide;
