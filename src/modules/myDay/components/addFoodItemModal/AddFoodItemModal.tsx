import { FC, useEffect } from 'react';
import { FormikErrors, useFormik } from 'formik';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reduxHooks';

import {
  setAddFoodItemVisible,
  setSelectFoodItemVisible,
  setTotalCalories,
  setTotalPrice,
  addToFoodStuff,
  resetCurrenFoodItem,
  clearMealFoodstuffItem,
  setTotalPriceMinus,
  setTotalCaloriesMinus,
} from '../../../../redux/slices/myDaySlice';
import { caloriesCalc, priceCalc } from '../../../../utils/calc';

import './add-food-item-modal.scss';

interface IFormValues {
  name: string;
  weight: number;
}

const validate = (values: IFormValues) => {
  let errors: FormikErrors<IFormValues> = {};
  if (!values.name) {
    errors.name = 'Не выбран продукт';
  } else if (!values.weight) {
    errors.weight = '<ошибка!>';
  } else if (values.weight < 0 || values.weight === 0) {
    errors.weight = '<ошибка!>';
  }
  return errors;
};

const AddFoodItemModal: FC = () => {
  const dispatch = useAppDispatch();
  const isModalVisible = useAppSelector(
    (store) => store.localMyDaySlice.isAddFoodItemVisible
  );
  const selectedFoodItem = useAppSelector(
    (store) => store.localMyDaySlice.foodItem
  );
  const foodstuffList = useAppSelector(
    (state) => state.localMyDaySlice.currentMeal.foodstuff
  );

  const modalClasses = classNames({
    'add-food-item': true,
    'add-food-item_active': isModalVisible,
  });

  const handleSelectVisible = () => {
    dispatch(setSelectFoodItemVisible(true));
  };

  const handelCansel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(setAddFoodItemVisible(false));
    formik.resetForm();
  };

  // Formik
  const initialValues: IFormValues = {
    name: '',
    weight: 0,
  };

  const formik = useFormik<IFormValues>({
    initialValues,
    validate,
    onSubmit: (values) => {
      // расчёт калорий веса выбранного продукта
      const foodWeightCalories = caloriesCalc(
        selectedFoodItem.calories,
        values.weight
      );
      // расчёт цены веса выбранного продукта
      const foodWeightPrice = priceCalc(selectedFoodItem.price, values.weight);
      // формирование продукта со значениями для заданного веса для записи в лист текущего приёма пищи
      const foodItem = {
        ...selectedFoodItem,
        price: foodWeightPrice,
        calories: foodWeightCalories,
        weight: values.weight,
      };

      // проверяем, есть ли уже такой продукт в списке, и если да, то получаем его
      const checkedItem = foodstuffList.find((item) => item.id === foodItem.id);
      // если добавляемый продукт уже был в списке, вычитаем значение его полей из общего значения этих полей
      // и удаляем его из списка
      if (checkedItem) {
        dispatch(setTotalCaloriesMinus(checkedItem.calories));
        dispatch(setTotalPriceMinus(checkedItem.price));
        dispatch(clearMealFoodstuffItem(checkedItem.id));
      }

      dispatch(addToFoodStuff(JSON.parse(JSON.stringify(foodItem))));
      dispatch(setTotalCalories(foodItem.calories));
      dispatch(setTotalPrice(foodItem.price));
      dispatch(resetCurrenFoodItem());
      dispatch(setAddFoodItemVisible(false));
      formik.resetForm();
    },
  });

  useEffect(() => {
    formik.setFieldValue('name', selectedFoodItem.name);
    formik.setFieldValue('weight', selectedFoodItem.weight);
  }, [selectedFoodItem]);

  return (
    <div className={modalClasses}>
      <form className='add-food-item__form form' onSubmit={formik.handleSubmit}>
        <h3 className='form__title'>Добавить продукт:</h3>
        <div className='form__content'>
          <div className='form__input-block'>
            <label className='form__name-label' htmlFor='name'>
              <input
                className='form__name-input'
                type='text'
                id='name'
                name='name'
                readOnly
                value={formik.values.name || ''}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className='form__error'>{formik.errors.name}</div>
              ) : null}
            </label>
            <label className='form__weight-label' htmlFor='weight'>
              <input
                className='form__weight-input'
                type='number'
                name='weight'
                id='weight'
                placeholder='вес'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.weight || ''}
              />
              {formik.touched.weight && formik.errors.weight ? (
                <div className='form__error'>{formik.errors.weight}</div>
              ) : null}
            </label>
          </div>
          <div className='form__buttons-block'>
            <span className='form__addBtn' onClick={handleSelectVisible}></span>
            <div className='form__confirm-block'>
              <button
                className='form__btn form__btn-cansel'
                onClick={(e) => handelCansel(e)}
              ></button>
              <button
                className='form__btn form__btn-submit'
                type='submit'
              ></button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFoodItemModal;
