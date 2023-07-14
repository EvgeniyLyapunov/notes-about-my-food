import { FC, useEffect } from 'react';
import { FormikErrors, useFormik } from 'formik';
import classNames from 'classnames';

import { IDataBaseItem } from '../../../../models/modelTypes';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reduxHooks';

import {
  setCreateItemModalVisible,
  setCalcPriceVisible,
} from '../../../../redux/slices/dataViewSlice';
import {
  resetBaseItemForEdit,
  resetCalcResult,
} from '../../../../redux/slices/dataFoodSlice';
import { resetSetsItemForEdit } from '../../../../redux/slices/dataSetsSlice';

import { postEditedFoodItem } from '../../../../redux/asyncThunks/postEditedFoodItem';
import { postEditedSetsItem } from '../../../../redux/asyncThunks/postEditedSetsItem';
import { postNewFoodItem } from '../../../../redux/asyncThunks/postNewFoodItem';
import { postNewSetsItem } from '../../../../redux/asyncThunks/postNewSetsItem';

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
  const dispatch = useAppDispatch();

  const tabActive = useAppSelector((store) => store.dataViewSlice.activeTab);

  // флаг для открытия этого окна
  const isAddItemModalVisible = useAppSelector(
    (store) => store.dataViewSlice.isAddItemModalVisible
  );

  const user = useAppSelector((store) => store.authSlice.user);

  const editFoodItemValues = useAppSelector(
    (store) => store.dataFoodSlice.baseItemForEdit
  );
  const editSetsItemValues = useAppSelector(
    (store) => store.dataSetsSlice.setsForEdit
  );

  const editItemValues = editFoodItemValues
    ? editFoodItemValues
    : editSetsItemValues;

  const calcPrice = useAppSelector(
    (store) => store.dataFoodSlice.baseItemCalcPrice
  );

  const handleModalClose = (): void => {
    dispatch(resetBaseItemForEdit());
    dispatch(resetSetsItemForEdit());
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
      // режим редактирования
      if (editItemValues) {
        const editedValues: IDataBaseItem = {
          ...values,
          id: editItemValues.id,
        };
        switch (tabActive) {
          case 'food':
            dispatch(postEditedFoodItem(JSON.stringify(editedValues)));
            break;
          case 'set':
            dispatch(postEditedSetsItem(JSON.stringify(editedValues)));
            break;
        }
        // режим создания новой записи
      } else {
        switch (tabActive) {
          case 'food':
            dispatch(postNewFoodItem(JSON.stringify(values)));
            break;
          case 'set':
            dispatch(postNewSetsItem(JSON.stringify(values)));
            break;
        }
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
              {tabActive === 'food' ? (
                <span>название продукта</span>
              ) : (
                <span>название набора</span>
              )}
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
                {tabActive === 'food' ? (
                  <span>ккал / 100гр</span>
                ) : (
                  <span>ккал / ед.</span>
                )}
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
                {tabActive === 'food' ? (
                  <span>цена / 100гр</span>
                ) : (
                  <span>цена / ед.</span>
                )}
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
                  {tabActive === 'food' ? (
                    <span
                      className='add-item__form-input-calc-btn'
                      onClick={handleCalcVisible}
                    ></span>
                  ) : null}
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
