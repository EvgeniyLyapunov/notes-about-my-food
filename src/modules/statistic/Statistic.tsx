import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Link } from 'react-router-dom';

import {
  appBurgerMenuActive,
  changePageName,
  setPageFrom,
  hidingActivePageLink,
} from '../../redux/slices/headerSlice';

import DaysList from './components/daysList/DaysList';
import Loading from '../../app/components/loading/loading';

import { resetErrorInfo } from '../../redux/slices/statisticSlice';
import { getDaysResult } from '../../redux/asyncThunks/getDaysResult';

import './statistic.scss';

const Statistic: FC = () => {
  const user = useAppSelector((state) => state.authSlice.user?.userId);

  const isLoading = useAppSelector(
    (state) => state.statisticSlice.dataLoadingStatus
  );
  const isError = useAppSelector(
    (state) => state.statisticSlice.dataLoadingError
  );

  const list = useAppSelector((state) => state.statisticSlice.daysList);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDaysResult(user as string));
    dispatch(hidingActivePageLink('statistic'));
    dispatch(changePageName('Статистика'));
    dispatch(setPageFrom('Статистика'));
    dispatch(appBurgerMenuActive(false));
    return () => {
      dispatch(appBurgerMenuActive(false));
    };
  }, [dispatch]);

  const handleClose = () => {
    dispatch(resetErrorInfo());
  };

  return (
    <div className='statistic'>
      {!isLoading && !isError ? <DaysList list={list} /> : null}
      {isLoading ? <Loading /> : null}
      {isError ? <ErrorStatus dataLoadingError={isError} /> : null}
      <div className='statistic__buttons-block'>
        <Link
          className='statistic__button-close'
          to={'/'}
          onClick={handleClose}
        >
          Закрыть
        </Link>
      </div>
    </div>
  );
};

export default Statistic;

interface IErrorStatusProps {
  dataLoadingError: string;
}

const ErrorStatus: FC<IErrorStatusProps> = ({ dataLoadingError }) => {
  return <div className='statistic__loading-status'>{dataLoadingError}</div>;
};
