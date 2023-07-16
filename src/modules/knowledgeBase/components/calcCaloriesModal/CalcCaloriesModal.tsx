import { FC, useEffect } from 'react';
import classNames from 'classnames';
import { FormikErrors, useFormik } from 'formik';

import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { setCalcCaloriesVisible } from '../../../../redux/slices/dataViewSlice';
import { setSetsCalcResult } from '../../../../redux/slices/dataSetsSlice';
import { caloriesCalc } from '../../../../utils/calc';

import './calc-calories-modal.scss';

interface IFormValues {
  calories: number;
  weight: number;
}

const validate = (values: IFormValues) => {
  let errors: FormikErrors<IFormValues> = {};
  if (!values.calories) {
    errors.calories = 'Ошибка';
  } else if (!values.weight) {
    errors.weight = 'Ошибка';
  } else if (values.calories === 0 || values.calories < 0) {
    errors.calories = 'Ошибка';
  } else if (values.weight === 0 || values.weight < 0) {
    errors.weight = 'Ошибка';
  }
  return errors;
};

const CalcCaloriesModal: FC = () => {
  const dispatch = useAppDispatch();
  const modalVisible = useAppSelector(
    (state) => state.dataViewSlice.isCalcCaloriesVisible
  );

  const handleCansel = () => {
    dispatch(setCalcCaloriesVisible(false));
    formik.resetForm();
  };

  // Formik
  const initialValues: IFormValues = {
    calories: 0,
    weight: 0,
  };

  const formik = useFormik<IFormValues>({
    initialValues,
    validate,
    onSubmit: (values) => {
      const res = caloriesCalc(values.calories, values.weight);
      dispatch(setSetsCalcResult(res));
      handleCansel();
    },
  });

  useEffect(() => {
    formik.setFieldError('calories', '');
  }, [modalVisible]);

  const calcPriceClasses = classNames({
    'calc-calories': true,
    'calc-calories_active': modalVisible,
  });

  return (
    <div className={calcPriceClasses}>
      <form className='calc-calories__window' onSubmit={formik.handleSubmit}>
        <h3 className='calc-calories__title'>Расчёт калорийности набора:</h3>
        <label className='calc-calories__box-calories' htmlFor='calories'>
          <span className='calc-calories__box-calories-label'>
            Ккал в 100 гр.:
          </span>
          <input
            className='calc-calories__box-calories-input'
            type='number'
            name='calories'
            id='calories'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.calories || ''}
            onKeyDown={(e) => {
              e.key === 'Enter' && e.preventDefault();
            }}
          />
          {formik.touched.calories && formik.errors.calories ? (
            <div className='calc-calories__box-calories-error'>
              {formik.errors.calories}
            </div>
          ) : null}
        </label>
        <label className='calc-calories__box-weight' htmlFor='weight'>
          <span className='calc-calories__box-weight-label'>
            Вес единицы товара:
          </span>
          <input
            className='calc-calories__box-weight-input'
            type='number'
            name='weight'
            id='weight'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.weight || ''}
            onKeyDown={(e) => {
              e.key === 'Enter' && e.preventDefault();
            }}
          />
          {formik.touched.weight && formik.errors.weight ? (
            <div className='calc-calories__box-weight-error'>
              {formik.errors.weight}
            </div>
          ) : null}
        </label>
        <div className='calc-calories__box-buttons'>
          <button
            className='calc-calories__box-buttons-btn calc-calories__box-buttons-btn-cansel'
            onClick={handleCansel}
          ></button>
          <button
            className='calc-calories__box-buttons-btn calc-calories__box-buttons-btn-submit'
            type='submit'
          ></button>
        </div>
      </form>
    </div>
  );
};

export default CalcCaloriesModal;
