import { FC } from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reduxHooks';
import { setAddItemModalVisible } from '../../../../redux/slices/knowledgeBaseSlice';
import './add-item-modal.scss';

interface IFormValues {
  name: string;
  calories: number | undefined;
  price: number | undefined;
}

const InnerForm = (props: FormikProps<IFormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form className='add-item-modal__form'>
      <h2 className='add-item-modal__form-title'>добавить в Базу Знаний:</h2>
      <label className='add-item-modal__form-input-name-label' htmlFor='name'>
        <span>название продукта</span>
        <Field
          className='add-item-modal__form-input-name'
          id='name'
          type='text'
          name='name'
        />
        {touched.name && errors.name && <div>{errors.name}</div>}
      </label>
      <div className='add-item-modal__form-input-group'>
        <label
          className='add-item-modal__form-input-group-label'
          htmlFor='calories'
        >
          <span>ккал / 100гр</span>
          <Field
            className='add-item-modal__form-input-group-item'
            id='calories'
            type='number'
            name='calories'
          />
          {touched.calories && errors.calories && <div>{errors.calories}</div>}
        </label>
        <label
          className='add-item-modal__form-input-group-label'
          htmlFor='price'
        >
          <span>цена / 100гр</span>
          <Field
            className='add-item-modal__form-input-group-item'
            id='price'
            type='number'
            name='price'
          />
          {touched.price && errors.price && <div>{errors.price}</div>}
        </label>
      </div>
      <div className='add-item-modal__form-btn-group'>
        <button
          className='add-item-modal__form-btn add-item-modal__form-btn-reset'
          type='reset'
        >
          Очистить
        </button>
        <button
          className='add-item-modal__form-btn add-item-modal__form-btn-submit'
          type='submit'
          disabled={isSubmitting}
        >
          Сохранить
        </button>
      </div>
    </Form>
  );
};

interface MyFormProps {
  name: string;
  calories: number | undefined;
  price: number | undefined;
}

const MyForm = withFormik<IFormValues, MyFormProps>({
  validate: (values: IFormValues) => {
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
      errors.calories = 'Значение должно быть больше 0';
    } else if (values.price && values.price < 0) {
      errors.price = 'Цена не может быть меньше 0';
    }
    return errors;
  },
  handleSubmit: (values) => {
    alert(JSON.stringify(values));
  },
})(InnerForm);

const AddItemModal: FC = () => {
  const isAddItemModalVisible = useAppSelector(
    (store) => store.knowledgeBase.isAddItemModalVisible
  );

  const dispatch = useAppDispatch();

  const handleModalClose = (): void => {
    dispatch(setAddItemModalVisible(false));
  };

  const addItemModalClasses = classNames({
    'add-item-modal': true,
    'add-item-modal_active': isAddItemModalVisible,
  });

  return (
    <div className={addItemModalClasses}>
      <div className='add-item-modal__window'>
        <button
          className='add-item-modal__window-close'
          onClick={handleModalClose}
        >
          <span></span>
        </button>
        <MyForm name={''} calories={undefined} price={undefined} />
      </div>
    </div>
  );
};

export default AddItemModal;
