import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import {
  appBurgerMenuActive,
  changePageName,
  setPageFrom,
  hidingActivePageLink,
} from '../../redux/slices/headerSlice';
import { setList } from '../../redux/slices/knowledgeBaseDataSlice';

import { getKnowledgeBaseList } from '../../redux/asyncThunks/getKnowledgeBaseList';

import Tabs from './components/tabs/Tabs';
import ButtonsBlock from './components/buttonsBlock/ButtonsBlock';
import CreateAndEditModal from './components/createAndEditModal/CreateAndEditModal';
import ConfirmDeleteModal from './components/confirmDeleteModal/ConfirmDeleteModal';
import CalcPriceModal from './components/calcPriceModal/CalcPriceModal';
import Loading from '../../app/components/loading/loading';
import ErrorPage from './components/error/ErrorPage';

import { knowledgeBaseLoadState } from '../../utils/browserStorage';

import './knowledge-base.scss';

const KnowledgeBase: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.authSlice.user);

  const isLoading = useAppSelector(
    (state) => state.knowledgeBaseDataSlice.dataLoadingStatus
  );
  const isError = useAppSelector(
    (state) => state.knowledgeBaseDataSlice.isError
  );

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
    const localData = knowledgeBaseLoadState();
    if (localData) {
      dispatch(setList(localData));
    } else {
      dispatch(getKnowledgeBaseList(user?.userId as string));
    }
  }, [dispatch]);

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
