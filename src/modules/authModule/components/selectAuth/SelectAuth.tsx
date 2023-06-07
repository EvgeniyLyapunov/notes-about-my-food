import { FC } from 'react';
import { useAppDispatch } from '../../../../hooks/reduxHooks';

import {
  setSelectAuthVisible,
  setRegViewVisible,
  setLoginViewVisible,
} from '../../../../redux/slices/AuthSlice';

import './select-auth.scss';

const SelectAuth: FC = () => {
  const dispatch = useAppDispatch();
  const handleRegOpen = () => {
    dispatch(setSelectAuthVisible(false));
    dispatch(setRegViewVisible(true));
  };
  const handleLoginOpen = () => {
    dispatch(setSelectAuthVisible(false));
    dispatch(setLoginViewVisible(true));
  };
  return (
    <div className='select-auth'>
      <div className='select-auth__container'>
        <div className='select-auth__case' onClick={handleRegOpen}>
          <span className='select-auth__case-icon select-auth__case-icon_reg'></span>
          <span className='select-auth__case-text'>Регистрация</span>
        </div>
        <div className='select-auth__case' onClick={handleLoginOpen}>
          <span className='select-auth__case-icon select-auth__case-icon_log'></span>
          <span className='select-auth__case-text'>Вход</span>
        </div>
      </div>
    </div>
  );
};

export default SelectAuth;
