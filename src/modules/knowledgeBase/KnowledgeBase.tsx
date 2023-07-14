import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import {
  appBurgerMenuActive,
  changePageName,
  setPageFrom,
  hidingActivePageLink,
} from '../../redux/slices/headerSlice';
import { initItemsList } from '../../redux/slices/dataFoodSlice';
import { initSetsList } from '../../redux/slices/dataSetsSlice';

import { getBaseList } from '../../redux/asyncThunks/getBaseList';
import { getSetsList } from '../../redux/asyncThunks/getSetsList';

import Tabs from './components/tabs/Tabs';
import ButtonsBlock from './components/buttonsBlock/ButtonsBlock';
import CreateAndEditModal from './components/createAndEditModal/CreateAndEditModal';
import ConfirmDeleteModal from './components/confirmDeleteModal/ConfirmDeleteModal';
import CalcPriceModal from './components/calcPriceModal/CalcPriceModal';
import Loading from '../../app/components/loading/loading';
import ErrorPage from './components/error/ErrorPage';

import { baseLoadState, setsLoadState } from '../../utils/browserStorage';

import './knowledge-base.scss';

const KnowledgeBase: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.authSlice.user);

  const isListData = useAppSelector(
    (state) => state.dataFoodSlice.baseItemsList.length
  );
  const isSetsListData = useAppSelector(
    (state) => state.dataSetsSlice.setsList.length
  );

  const isFoodLoading = useAppSelector(
    (state) => state.dataFoodSlice.dataLoadingStatus
  );
  const isFoodError = useAppSelector((state) => state.dataFoodSlice.isError);
  const isSetsLoading = useAppSelector(
    (state) => state.dataSetsSlice.setsLoadingStatus
  );
  const isSetsError = useAppSelector((state) => state.dataSetsSlice.isError);

  const isLoading = isFoodLoading || isSetsLoading ? true : false;
  const isError = isFoodError || isSetsError ? true : false;

  useEffect(() => {
    dispatch(hidingActivePageLink('knowledgeBase'));
    dispatch(changePageName('База знаний'));
    dispatch(setPageFrom('База знаний'));
    dispatch(appBurgerMenuActive(false));

    return () => {
      dispatch(appBurgerMenuActive(false));
    };
  }, [dispatch]);

  // работа с localStorage и БД
  useEffect(() => {
    if (isListData === 0) {
      const localData = baseLoadState();
      if (localData) {
        dispatch(initItemsList(localData));
      } else {
        dispatch(getBaseList(user?.userId as string));
      }
    }
    if (isSetsListData === 0) {
      const localData = setsLoadState();
      if (localData) {
        dispatch(initSetsList(localData));
      } else {
        dispatch(getSetsList(user?.userId as string));
      }
    }
  }, [isListData, isSetsListData]);

  return (
    <div className='knowledge-base'>
      {isLoading ? <Loading /> : null}
      {isError ? <ErrorPage /> : null}
      {!isLoading && !isError ? (
        <>
          <Tabs />
          <ButtonsBlock />
          <CreateAndEditModal />
          <ConfirmDeleteModal />
          <CalcPriceModal />
        </>
      ) : null}
    </div>
  );
};

export default KnowledgeBase;
