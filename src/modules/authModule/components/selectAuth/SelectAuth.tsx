import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import classNames from 'classnames';

import {
  setSelectAuthVisible,
  setRegViewVisible,
  setLoginViewVisible,
  setConfirmLogoutVisible,
} from '../../../../redux/slices/AuthSlice';

import './select-auth.scss';

const SelectAuth: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.authSlice.user);

  const logClasses = classNames({
    'select-auth__case-icon': true,
    'select-auth__case-icon_log': !user,
    'select-auth__case-icon_logout': user,
  });

  const handleRegOpen = () => {
    dispatch(setSelectAuthVisible(false));
    dispatch(setRegViewVisible(true));
  };
  const handleLoginOpen = () => {
    dispatch(setSelectAuthVisible(false));
    dispatch(setLoginViewVisible(true));
  };
  const handleLogOut = () => {
    dispatch(setConfirmLogoutVisible(true));
  };
  return (
    <div className='select-auth'>
      <div className='select-auth__container'>
        {!user ? (
          <div className='select-auth__in'>
            <div className='select-auth__case' onClick={handleRegOpen}>
              <span className='select-auth__case-icon select-auth__case-icon_reg'></span>
              <span className='select-auth__case-text'>Регистрация</span>
            </div>
            <div className='select-auth__case' onClick={handleLoginOpen}>
              <span className='select-auth__case-icon select-auth__case-icon_log'></span>
              <span className='select-auth__case-text'>Вход</span>
            </div>
          </div>
        ) : (
          <div className='select-auth__out'>
            <div className='select-auth__case' onClick={handleLogOut}>
              <span className='select-auth__case-icon select-auth__case-icon_logout'></span>
              <span className='select-auth__case-text'>Выход</span>
            </div>
          </div>
        )}
        {/* <div className='select-auth__in'>
          <div className='select-auth__case' onClick={handleRegOpen}>
            <span className='select-auth__case-icon select-auth__case-icon_reg'></span>
            <span className='select-auth__case-text'>Регистрация</span>
          </div>
          <div className='select-auth__case' onClick={handleLoginOpen}>
            <span className='select-auth__case-icon select-auth__case-icon_log'></span>
            <span className='select-auth__case-text'>Вход</span>
          </div>
        </div>
        <div className='select-auth__out'>
          <div className='select-auth__case' onClick={handleLoginOpen}>
            <span className='select-auth__case-icon select-auth__case-icon_logout'></span>
            <span className='select-auth__case-text'>Выход</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SelectAuth;
