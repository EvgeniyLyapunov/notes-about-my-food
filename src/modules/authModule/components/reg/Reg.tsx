import { FC, useEffect } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { postNewUser } from '../../../../redux/asyncThunks/postNewUser';

import {
  setRegSuccess,
  setRegViewVisible,
  resetErrorMessage,
} from '../../../../redux/slices/AuthSlice';

import './reg.scss';

interface IFormValues {
  userId: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

const validate = (values: IFormValues) => {
  let errors: FormikErrors<IFormValues> = {};
  if (!values.nickname) {
    errors.nickname = 'Обязательное поле';
  } else if (values.nickname.length < 2) {
    errors.nickname = 'Минимум 2 символа';
  } else if (!values.password) {
    errors.password = 'Обязательное поле';
  } else if (values.password.length < 5) {
    errors.password = 'Минимум 5 символов';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Повторите пароль';
  }
  return errors;
};

const Reg: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isErrorMessage = useAppSelector(
    (state) => state.authSlice.isErrorMessage
  );

  const isRegSuccess = useAppSelector((state) => state.authSlice.isRegSuccess);

  useEffect(() => {
    if (isRegSuccess) {
      formik.resetForm();
      dispatch(setRegViewVisible(false));
      dispatch(setRegSuccess(false));
      dispatch(resetErrorMessage());
      navigate('/');
    }
  }, [isRegSuccess]);

  // Formik
  const initialValues: IFormValues = {
    userId: nanoid(),
    nickname: '',
    password: '',
    confirmPassword: '',
  };
  const formik = useFormik<IFormValues>({
    initialValues,
    validate,
    onSubmit: (values) => {
      dispatch(postNewUser(JSON.stringify(values)));
    },
  });
  return (
    <div className='reg'>
      <h2 className='reg__title'>Регистрация</h2>
      <form className='reg__form' onSubmit={formik.handleSubmit}>
        <label className='reg__form-label' htmlFor='nickname'>
          <span>Ваше имя:</span>
          <input
            className='reg__form-input'
            id='nickname'
            type='text'
            name='nickname'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nickname || ''}
          />
          {formik.touched.nickname && formik.errors.nickname ? (
            <div className='reg__form-error'>{formik.errors.nickname}</div>
          ) : null}
        </label>

        <label className='reg__form-label' htmlFor='password'>
          <span>Ваш пароль:</span>
          <input
            className='reg__form-input'
            id='password'
            type='password'
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password || ''}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='reg__form-error'>{formik.errors.password}</div>
          ) : null}
        </label>

        <label className='reg__form-label' htmlFor='confirmPassword'>
          <span>Подтвердите пароль:</span>
          <input
            className='reg__form-input'
            id='confirmPassword'
            type='password'
            name='confirmPassword'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword || ''}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className='reg__form-error'>
              {formik.errors.confirmPassword}
            </div>
          ) : null}
        </label>
        <div className='reg__form-buttons-block'>
          <button type='submit' className='reg__form-submit'>
            Регистрация
          </button>
        </div>
        {isErrorMessage ? (
          <span className='reg__form-error'>{isErrorMessage}</span>
        ) : null}
      </form>
    </div>
  );
};

export default Reg;
