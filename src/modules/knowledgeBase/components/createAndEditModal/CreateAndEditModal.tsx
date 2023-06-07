import { FC, useEffect } from 'react';
import { FormikErrors, useFormik } from 'formik';
import classNames from 'classnames';

import { IDataBaseItem } from '../../../../models/modelTypes';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reduxHooks';

import {
  setCreateItemModalVisible,
  setCalcPriceVisible,
} from '../../../../redux/slices/knowledgeBaseViewSlice';

import {
  resetBaseItemForEdit,
  resetCalcResult,
} from '../../../../redux/slices/knowledgeBaseDataSlice';
import { postEditedKnowledgeBaseItem } from '../../../../redux/asyncThunks/postEditedKnowledgeBaseItem';
import { postNewKnowledgeBaseItem } from '../../../../redux/asyncThunks/postNewKnowledgeBaseItem';

import './add-item.scss';

interface IFormValues {
  userId: string;
  name: string;
  calories: number;
  price: number;
}

const validate = (values: IFormValues) => {
  let errors: FormikErrors<IFormValues> = {};
  if (!values.name) {
    errors.name = 'Обязательное поле';
  } else if (values.name.length < 2) {
    errors.name = 'Минимум 2 символа';
  } else if (!values.calories) {
    errors.calories = 'Обязательное поле';
  } else if (
    (values.calories && values.calories === 0) ||
    (values.calories && values.calories < 0)
  ) {
    errors.calories = 'Значение меньше 0';
  } else if (values.price && values.price < 0) {
    errors.price = 'Цена меньше 0';
  }
  return errors;
};

const CreateAndEditModal: FC = () => {
  const isAddItemModalVisible = useAppSelector(
    (store) => store.knowledgeBaseViewSlice.isAddItemModalVisible
  );

  const user = useAppSelector((store) => store.authSlice.user);

  const editItemValues = useAppSelector(
    (store) => store.knowledgeBaseDataSlice.baseItemForEdit
  );

  const calcPrice = useAppSelector(
    (store) => store.knowledgeBaseDataSlice.baseItemCalcPrice
  );

  const dispatch = useAppDispatch();

  const handleModalClose = (): void => {
    dispatch(resetBaseItemForEdit());
    dispatch(setCreateItemModalVisible(false));
    formik.resetForm();
  };

  const handleCalcVisible = () => {
    dispatch(setCalcPriceVisible(true));
  };

  const addItemModalClasses = classNames({
    'add-item': true,
    'add-item_active': isAddItemModalVisible,
  });

  // Formik
  const initialValues: IFormValues = {
    userId: `${user?.userId}`,
    name: '',
    calories: 0,
    price: 0,
  };

  const formik = useFormik<IFormValues>({
    initialValues,
    validate,
    onSubmit: (values) => {
      if (editItemValues) {
        const editedValues: IDataBaseItem = {
          ...values,
          id: editItemValues.id,
        };
        dispatch(postEditedKnowledgeBaseItem(JSON.stringify(editedValues)));
      } else {
        dispatch(postNewKnowledgeBaseItem(JSON.stringify(values)));
      }
      dispatch(resetCalcResult());
      handleModalClose();
    },
  });

  useEffect(() => {
    if (editItemValues) {
      formik.setFieldValue('name', editItemValues.name);
      formik.setFieldValue('calories', editItemValues.calories);
      formik.setFieldValue('price', editItemValues.price);
    }
  }, [editItemValues]);

  useEffect(() => {
    formik.setFieldValue('price', calcPrice);
  }, [calcPrice]);

  return (
    <div className={addItemModalClasses}>
      <div className='add-item__window'>
        <form className='add-item__form' onSubmit={formik.handleSubmit}>
          <div className='add-item__form-fields-block'>
            <h2 className='add-item__form-title'>
              {editItemValues
                ? 'Отредактировать данные'
                : 'Добавить в Базу Знаний:'}
            </h2>
            <label className='add-item__form-input-name-label' htmlFor='name'>
              <span>название продукта</span>
              <input
                className='add-item__form-input-name'
                id='name'
                type='text'
                name='name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name || ''}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className='add-item__form-error'>{formik.errors.name}</div>
              ) : null}
            </label>
            <div className='add-item__form-input-group'>
              <label
                className='add-item__form-input-group-label'
                htmlFor='calories'
              >
                <span>ккал / 100гр</span>
                <input
                  className='add-item__form-input-group-item'
                  id='calories'
                  type='number'
                  name='calories'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.calories || ''}
                />
                {formik.touched.calories && formik.errors.calories ? (
                  <div className='add-item__form-error'>
                    {formik.errors.calories}
                  </div>
                ) : null}
              </label>
              <label
                className='add-item__form-input-group-label'
                htmlFor='price'
              >
                <span>цена / 100гр</span>
                <div className='add-item__form-input-calc-group'>
                  <input
                    className='add-item__form-input-group-item add-item__form-input-group-item-calc'
                    id='price'
                    type='number'
                    name='price'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price || ''}
                  />
                  <span
                    className='add-item__form-input-calc-btn'
                    onClick={handleCalcVisible}
                  ></span>
                </div>
                {formik.touched.price && formik.errors.price ? (
                  <div className='add-item__form-error'>
                    {formik.errors.price}
                  </div>
                ) : null}
              </label>
            </div>
          </div>
          <div className='add-item__form-btn-group'>
            <button
              className='add-item__form-btn add-item__form-btn-reset'
              type='reset'
              onClick={handleModalClose}
            >
              Закрыть
            </button>
            <button
              className='add-item__form-btn add-item__form-btn-submit'
              type='submit'
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAndEditModal;
