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
  knowledgeBaseLoadState,
  myDayLoadState,
  myDaySaveState,
} from '../../utils/browserStorage';
import { createMyDayForDB } from '../../utils/createMyDayForDB';

import './my-day.scss';
import { setList } from '../../redux/slices/knowledgeBaseDataSlice';
import { getKnowledgeBaseList } from '../../redux/asyncThunks/getKnowledgeBaseList';

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
  const dbFoodItemsList = useAppSelector(
    (state) => state.knowledgeBaseDataSlice.baseItemsList
  );
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
      const localData = knowledgeBaseLoadState();
      if (localData) {
        dispatch(setList(localData));
      } else {
        dispatch(getKnowledgeBaseList(userId as string));
      }
    }

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
          <SelectFoodItemModal list={dbFoodItemsList} />
        </>
      ) : null}
    </div>
  );
};

export default MyDay;
