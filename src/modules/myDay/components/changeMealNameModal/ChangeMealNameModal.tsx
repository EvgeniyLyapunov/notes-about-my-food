import { FC, useEffect } from 'react';
import { FormikErrors, useFormik } from 'formik';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reduxHooks';
import { setMealName } from '../../../../redux/slices/myDayDataSlice';

import { setChangeMealNameVisible } from '../../../../redux/slices/myDayViewSlice';

import './change-meal-name-modal.scss';

interface IFormValues {
  name: string;
}

const validate = (values: IFormValues) => {
  let errors: FormikErrors<IFormValues> = {};
  if (!values.name) {
    errors.name = 'Обязательное поле';
  } else if (values.name.length < 2) {
    errors.name = 'Минимум 2 символа';
  }
  return errors;
};

const ChangeMealNameModal: FC = () => {
  const isModalVisible = useAppSelector(
    (store) => store.myDayViewSlice.isChangeMealNameVisible
  );
  const currentMeal = useAppSelector(
    (store) => store.myDayDataSlice.currentMeal
  );
  const dispatch = useAppDispatch();

  const handleModalClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    dispatch(setChangeMealNameVisible(false));
    formik.resetForm();
  };

  const modalClasses = classNames({
    'change-meal-name': true,
    'change-meal-name_active': isModalVisible,
  });

  // Formik
  const initialValues: IFormValues = {
    name: '',
  };
  const formik = useFormik<IFormValues>({
    initialValues,
    validate,
    onSubmit: (values) => {
      dispatch(setMealName(values.name));
      dispatch(setChangeMealNameVisible(false));
      formik.resetForm();
    },
  });

  useEffect(() => {
    formik.setFieldValue('name', currentMeal.name);
  }, [isModalVisible]);

  return (
    <div className={modalClasses}>
      <form className='change-meal-name__form' onSubmit={formik.handleSubmit}>
        <h3 className='change-meal-name__form-title'>Название приёма пищи:</h3>
        <div className='change-meal-name__form-inputs-block'>
          <label className='change-meal-name__form-label' htmlFor='name'>
            <input
              className='change-meal-name__form-input'
              type='text'
              id='name'
              name='name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name || ''}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='change-meal-name__form-error'>
                {formik.errors.name}
              </div>
            ) : null}
          </label>
          <div className='change-meal-name__form-buttons-block'>
            <button
              className='change-meal-name__form-btn change-meal-name__form-btn-cansel'
              onClick={(e) => handleModalClose(e)}
            ></button>
            <button
              className='change-meal-name__form-btn change-meal-name__form-btn-submit'
              type='submit'
            ></button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangeMealNameModal;
