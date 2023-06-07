import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Link } from 'react-router-dom';

import Reg from './components/reg/Reg';
import Login from './components/login/Login';
import SelectAuth from './components/selectAuth/SelectAuth';

import {
  startBurgerMenuActive,
  setStartBurgerMenuVisible,
} from '../../redux/slices/headerSlice';
import {
  setSelectAuthVisible,
  setLoginViewVisible,
  setRegViewVisible,
  resetErrorMessage,
} from '../../redux/slices/AuthSlice';

import './auth.scss';

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const isSelectVisible = useAppSelector(
    (state) => state.authSlice.isSelectAuthVisible
  );
  const isLoginVisible = useAppSelector(
    (state) => state.authSlice.isLoginViewVisible
  );
  const isRegVisible = useAppSelector(
    (state) => state.authSlice.isRegViewVisible
  );

  useEffect(() => {
    // закрываем панель меню
    dispatch(startBurgerMenuActive(false));
    // убираем со страницы кнопку бургера
    dispatch(setStartBurgerMenuVisible(true));
    // показываем панель выбора авторизации
    dispatch(setSelectAuthVisible(true));
  }, [dispatch]);
  const handleClose = () => {
    dispatch(setStartBurgerMenuVisible(false));
    dispatch(setLoginViewVisible(false));
    dispatch(setRegViewVisible(false));
    dispatch(setSelectAuthVisible(false));
    dispatch(resetErrorMessage());
  };
  return (
    <div className='auth'>
      {isSelectVisible ? <SelectAuth /> : null}
      {isLoginVisible ? <Login /> : null}
      {isRegVisible ? <Reg /> : null}
      <div className='auth__buttons-block'>
        <Link className='auth__button-close' to={'/'} onClick={handleClose}>
          Закрыть
        </Link>
      </div>
    </div>
  );
};

export default Auth;
