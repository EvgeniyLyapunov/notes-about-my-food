import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reduxHooks';

import { resetErrorMessage } from '../../../../redux/slices/AuthSlice';

import './error-page.scss';

const ErrorPage: FC = () => {
  const dispatch = useAppDispatch();

  const error = useAppSelector((state) => state.authSlice.isErrorMessage);

  const handleClose = () => {
    dispatch(resetErrorMessage());
  };

  return (
    <div className='error-page'>
      <div className='error-page__window'>
        <span className='error-page__text'>{error}</span>
        <div className='error-page__btn-block'>
          <button className='error-page__btn' onClick={handleClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
