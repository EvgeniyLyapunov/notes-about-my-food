import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import MealsList from './components/mealsList/MealsList';
import ButtonsBlock from './components/buttonsBlock/ButtonsBlock';

import {
  appBurgerMenuActive,
  changePageName,
  hidingActivePageLink,
} from '../../redux/slices/headerSlice';
import './my-day.scss';

const MyDay: FC = () => {
  const dispatch = useAppDispatch();
  const mealsList = useAppSelector((store) => store.localMyDaySlice.mealsList);

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
      <MealsList mealsItems={mealsList} />
      <ButtonsBlock />
    </div>
  );
};

export default MyDay;
