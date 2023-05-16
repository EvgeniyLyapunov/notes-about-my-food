import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import MealsList from './components/mealsList/MealsList';
import ButtonsBlock from './components/buttonsBlock/ButtonsBlock';

import ChangeMealNameModal from './components/changeMealNameModal/ChangeMealNameModal';
import AddFoodItemModal from './components/addFoodItemModal/AddFoodItemModal';
import SelectFoodItemModal from './components/selectFoodItemModal/SelectFoodItemModal';

import {
  appBurgerMenuActive,
  changePageName,
  hidingActivePageLink,
} from '../../redux/slices/headerSlice';

import './my-day.scss';

const MyDay: FC = () => {
  const dispatch = useAppDispatch();
  const mealsList = useAppSelector((store) => store.localMyDaySlice.mealsList);
  const currentMeal = useAppSelector(
    (store) => store.localMyDaySlice.currentMeal
  );
  const dbFoodItemsList = useAppSelector(
    (state) => state.localKnowledgeBaseSlice.baseItemsList
  );

  useEffect(() => {
    dispatch(hidingActivePageLink('myday'));
    dispatch(changePageName('Мой день'));
    dispatch(appBurgerMenuActive(false));
    return () => {
      dispatch(appBurgerMenuActive(false));
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className='my-day'>
      <MealsList mealsItems={[...mealsList, currentMeal]} />
      <ButtonsBlock />
      <ChangeMealNameModal />
      <AddFoodItemModal />
      <SelectFoodItemModal list={dbFoodItemsList} />
    </div>
  );
};

export default MyDay;
