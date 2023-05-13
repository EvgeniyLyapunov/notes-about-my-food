import { FC, useEffect } from 'react';
import { FormikErrors, useFormik } from 'formik';
import classNames from 'classnames';

import { BaseItem } from '../../../../models/modelTypes';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reduxHooks';
// import {
//   setAddItemModalVisible,
//   resetErrorStatus,
//   resetLoadingStatus,
//   addItem,
// } from '../../../../redux/slices/knowledgeBaseSlice';

import {
  addItemLocal,
  editItemLocal,
  setAddItemModalVisible,
  resetBaseItemforEdit,
} from '../../../../redux/slices/localKnowledgeBaseSlise';

import './add-item.scss';
// import spinner from '../../../../app/components/loading/spinner.gif';

interface IFormValues {
  userId: string;
  name: string;
  calories: number;
  price?: number;
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

const AddAndEditModal: FC = () => {
  const isAddItemModalVisible = useAppSelector(
    (store) => store.localKnowledgeBaseSlice.isAddItemModalVisible
  );

  const userId = useAppSelector((store) => store.globalSlice.userId);

  const editItemValues = useAppSelector(
    (store) => store.localKnowledgeBaseSlice.baseItemforEdit
  );

  // const { dataLoadingStatus, dataLoadingError } = useAppSelector(
  //   (store) => store.knowledgeBaseSlice
  // );

  const dispatch = useAppDispatch();

  const handleModalClose = (): void => {
    dispatch(resetBaseItemforEdit());
    dispatch(setAddItemModalVisible(false));
    // dispatch(resetErrorStatus());
    // dispatch(resetLoadingStatus());
    formik.resetForm();
  };

  const addItemModalClasses = classNames({
    'add-item': true,
    'add-item_active': isAddItemModalVisible,
  });

  // Formik
  const initialValues: IFormValues = {
    userId: `${userId}`,
    name: '',
    calories: 0,
    price: 0,
  };

  const formik = useFormik<IFormValues>({
    initialValues,
    validate,
    onSubmit: (values) => {
      if (editItemValues) {
        const editedValues: BaseItem = { ...values, id: editItemValues.id };
        dispatch(editItemLocal(editedValues));
      } else {
        dispatch(addItemLocal(values));
      }
      // dispatch(addItem(JSON.stringify(values)));
      // сделать проверку куда диспатчить - создать или редактировать
      handleModalClose();
    },
  });

  useEffect(() => {
    if (editItemValues) {
      formik.setFieldValue('name', editItemValues.name);
      formik.setFieldValue('calories', editItemValues.calories);
      formik.setFieldValue('price', editItemValues.price);
    }
    // eslint-disable-next-line
  }, [editItemValues]);

  return (
    <div className={addItemModalClasses}>
      <div className='add-item__window'>
        <button className='add-item__window-close' onClick={handleModalClose}>
          <span></span>
        </button>
        <form className='add-item__form' onSubmit={formik.handleSubmit}>
          {/* {dataLoadingStatus && <LoadingStatus />}
          {dataLoadingError !== null && (
            <ErrorStatus dataLoadingError={dataLoadingError} />
          )} */}
          <h2 className='add-item__form-title'>
            {editItemValues
              ? 'отредактировать данные'
              : 'добавить в Базу Знаний:'}
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
            <label className='add-item__form-input-group-label' htmlFor='price'>
              <span>цена / 100гр</span>
              <input
                className='add-item__form-input-group-item'
                id='price'
                type='number'
                name='price'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price || ''}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className='add-item__form-error'>
                  {formik.errors.price}
                </div>
              ) : null}
            </label>
          </div>
          <div className='add-item__form-btn-group'>
            <button
              className='add-item__form-btn add-item__form-btn-reset'
              type='reset'
              onClick={(e) => formik.resetForm()}
            >
              Очистить
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

export default AddAndEditModal;

// const LoadingStatus: FC = () => {
//   return (
//     <div className='add-item__loading-status'>
//       <img src={spinner} alt='spinner' />
//     </div>
//   );
// };

// interface IErrorStatusProps {
//   dataLoadingError: string;
// }

// const ErrorStatus: FC<IErrorStatusProps> = ({ dataLoadingError }) => {
//   return <div className='add-item__loading-status'>{dataLoadingError}</div>;
// };
