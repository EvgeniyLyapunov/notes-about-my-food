import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import MealsList from './components/mealsList/MealsList';
import ButtonsBlock from './components/buttonsBlock/ButtonsBlock';

import ChangeMealNameModal from './components/changeMealNameModal/ChangeMealNameModal';
import AddFoodItemModal from './components/addFoodItemModal/AddFoodItemModal';
import SelectFoodItemModal from './components/selectFoodItemModal/SelectFoodItemModal';
import Loading from '../../app/components/loading/loading';
import ErrorPage from './components/error/ErrorPage';

import {
  appBurgerMenuActive,
  changePageName,
  setPageFrom,
  hidingActivePageLink,
} from '../../redux/slices/headerSlice';

import { setDataFromLocalStorage } from '../../redux/slices/myDayDataSlice';
import { postMyDay } from '../../redux/asyncThunks/postMyDay';

import {
  currentMealSaveState,
  setsLoadState,
  baseLoadState,
  myDayLoadState,
  myDaySaveState,
} from '../../utils/browserStorage';
import { createMyDayForDB } from '../../utils/createMyDayForDB';

import './my-day.scss';
import { initItemsList } from '../../redux/slices/dataFoodSlice';
import { initSetsList } from '../../redux/slices/dataSetsSlice';
import { getBaseList } from '../../redux/asyncThunks/getBaseList';
import { getSetsList } from '../../redux/asyncThunks/getSetsList';

const MyDay: FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.authSlice.user?.userId);
  const mealsList = useAppSelector(
    (store) => store.myDayDataSlice.currentDay.meals
  );
  const currentMeal = useAppSelector(
    (store) => store.myDayDataSlice.currentMeal
  );
  const currentDay = useAppSelector((store) => store.myDayDataSlice.currentDay);

  const sourceForSelect = useAppSelector(
    (store) => store.myDayDataSlice.sourceForSelect
  );
  const dbFoodItemsList = useAppSelector(
    (state) => state.dataFoodSlice.baseItemsList
  );
  const dbSetsList = useAppSelector((state) => state.dataSetsSlice.setsList);

  const isViewMode = useAppSelector((store) => store.myDayViewSlice.isViewMode);
  const isLoading = useAppSelector(
    (state) => state.myDayDataSlice.dataLoadingStatus
  );
  const isError = useAppSelector((state) => state.myDayDataSlice.isError);

  useEffect(() => {
    dispatch(hidingActivePageLink('myday'));
    dispatch(changePageName('Мой день'));
    dispatch(setPageFrom('Мой день'));
    dispatch(appBurgerMenuActive(false));

    const localMyDay = myDayLoadState();
    // если в localStorage есть данные не на текущую дату
    if (localMyDay && localMyDay.date !== new Date().toLocaleDateString()) {
      // загрузка в БД
      dispatch(postMyDay(createMyDayForDB(localMyDay, userId as string)));
    } else if (
      // если в localStorage сохранены данные на текущую дату
      localMyDay &&
      localMyDay.date === new Date().toLocaleDateString()
    ) {
      // инициализация store
      dispatch(setDataFromLocalStorage());
    }

    if (dbFoodItemsList.length === 0) {
      const localData = baseLoadState();
      if (localData) {
        dispatch(initItemsList(localData));
      } else {
        dispatch(getBaseList(userId as string));
      }
    }
    if (dbSetsList.length === 0) {
      const localData = setsLoadState();
      if (localData) {
        dispatch(initSetsList(localData));
      } else {
        dispatch(getSetsList(userId as string));
      }
    }

    //TODO инициализировать setsList из базы знаний

    return () => {
      dispatch(appBurgerMenuActive(false));
    };
  }, [dispatch]);

  useEffect(() => {
    // работа с localStorage
    currentMealSaveState(currentMeal);
    myDaySaveState(currentDay);
  }, [currentMeal]);

  return (
    <div className='my-day'>
      {isLoading ? <Loading /> : null}
      {isError ? <ErrorPage /> : null}
      {!isLoading && !isError ? (
        <>
          <MealsList mealsItems={isViewMode ? mealsList : [currentMeal]} />
          <ButtonsBlock />
          <ChangeMealNameModal />
          <AddFoodItemModal />
          <SelectFoodItemModal
            list={sourceForSelect === 'food' ? dbFoodItemsList : dbSetsList}
          />
        </>
      ) : null}
    </div>
  );
};

export default MyDay;
