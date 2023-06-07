import { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { logInUser } from '../../../../redux/asyncThunks/logInUser';

import {
  resetErrorMessage,
  setLoginViewVisible,
  setLogSuccess,
} from '../../../../redux/slices/AuthSlice';

import './login.scss';

const Login: FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isLogSuccess = useAppSelector((store) => store.authSlice.isLogSuccess);

  const hendleNicknameChange = (value: string) => {
    setNickname(value);
  };
  const hendlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      nickname,
      password,
    };
    dispatch(logInUser(JSON.stringify(userData)));
  };

  useEffect(() => {
    if (isLogSuccess) {
      setNickname('');
      setPassword('');
      dispatch(setLoginViewVisible(false));
      dispatch(setLogSuccess(false));
      dispatch(resetErrorMessage());
      navigate('/');
    }
  }, [isLogSuccess]);

  return (
    <div className='login'>
      <h2 className='login__title'>Вход</h2>
      <form className='login__form' onSubmit={(e) => handleSubmit(e)}>
        <label className='login__form-label' htmlFor='nickname'>
          <span>Ваше имя:</span>
          <input
            className='login__form-input'
            id='nickname'
            type='text'
            name='nickname'
            onChange={(e) => hendleNicknameChange(e.target.value)}
            value={nickname}
          />
        </label>

        <label className='login__form-label' htmlFor='password'>
          <span>Ваш пароль:</span>
          <input
            className='login__form-input'
            id='password'
            type='password'
            name='password'
            onChange={(e) => hendlePasswordChange(e.target.value)}
            value={password}
          />
        </label>

        <div className='login__form-buttons-block'>
          <button className='login__form-submit'>Войти</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
