import { FC, useEffect } from 'react';
import classNames from 'classnames';
import { FormikErrors, useFormik } from 'formik';

import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { setCalcPriceVisible } from '../../../../redux/slices/knowledgeBaseViewSlice';
import { setCalcResult } from '../../../../redux/slices/localKnowledgeBaseSlise';
import { basePriceCalc } from '../../../../utils/calc';

import './calc-price-modal.scss';

interface IFormValues {
  price: number;
  weight: number;
}

const validate = (values: IFormValues) => {
  let errors: FormikErrors<IFormValues> = {};
  if (!values.price) {
    errors.price = 'Ошибка';
  } else if (!values.weight) {
    errors.weight = 'Ошибка';
  } else if (values.price === 0 || values.price < 0) {
    errors.price = 'Ошибка';
  } else if (values.weight === 0 || values.weight < 0) {
    errors.price = 'Ошибка';
  }
  return errors;
};

const CalcPriceModal: FC = () => {
  const dispatch = useAppDispatch();
  const modalVisible = useAppSelector(
    (state) => state.knowledgeBaseViewSlice.isCalcPriceVisible
  );

  const handleCansel = () => {
    dispatch(setCalcPriceVisible(false));
    formik.resetForm();
  };

  // Formik
  const initialValues: IFormValues = {
    price: 0,
    weight: 0,
  };

  const formik = useFormik<IFormValues>({
    initialValues,
    validate,
    onSubmit: (values) => {
      const res = basePriceCalc(values.price, values.weight);
      dispatch(setCalcResult(res));
      handleCansel();
    },
  });

  useEffect(() => {
    formik.setFieldError('price', '');
  }, [modalVisible]);

  const calcPriceClasses = classNames({
    'calc-price': true,
    'calc-price_active': modalVisible,
  });

  return (
    <div className={calcPriceClasses}>
      <form className='calc-price__window' onSubmit={formik.handleSubmit}>
        <h3 className='calc-price__title'>Расчёт цены за 100гр:</h3>
        <label className='calc-price__box-price' htmlFor='price'>
          <span className='calc-price__box-price-label'>
            Цена за единицу товара:
          </span>
          <input
            className='calc-price__box-price-input'
            type='number'
            name='price'
            id='price'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price || ''}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className='calc-price__box-price-error'>
              {formik.errors.price}
            </div>
          ) : null}
        </label>
        <label className='calc-price__box-weight' htmlFor='weight'>
          <span className='calc-price__box-weight-label'>
            Вес единицы товара:
          </span>
          <input
            className='calc-price__box-weight-input'
            type='number'
            name='weight'
            id='weight'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.weight || ''}
          />
          {formik.touched.weight && formik.errors.weight ? (
            <div className='calc-price__box-weight-error'>
              {formik.errors.weight}
            </div>
          ) : null}
        </label>
        <div className='calc-price__box-buttons'>
          <button
            className='calc-price__box-buttons-btn calc-price__box-buttons-btn-cansel'
            onClick={handleCansel}
          ></button>
          <button
            className='calc-price__box-buttons-btn calc-price__box-buttons-btn-submit'
            type='submit'
          ></button>
        </div>
      </form>
    </div>
  );
};

export default CalcPriceModal;
