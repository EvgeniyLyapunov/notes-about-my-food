import { FC, useEffect } from 'react';

import { useAppDispatch } from '../../hooks/reduxHooks';
import {
  appBurgerMenuActive,
  changePageName,
  setPageFrom,
  hidingActivePageLink,
} from '../../redux/slices/headerSlice';
import Tabs from './components/tabs/Tabs';
import ButtonsBlock from './components/buttonsBlock/ButtonsBlock';
import CreateAndEditModal from './components/createAndEditModal/CreateAndEditModal';
import ConfirmDeleteModal from './components/confirmDeleteModal/ConfirmDeleteModal';
import CalcPriceModal from './components/calcPriceModal/CalcPriceModal';

import './knowledge-base.scss';

const KnowledgeBase: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hidingActivePageLink('knowledgeBase'));
    dispatch(changePageName('База знаний'));
    dispatch(setPageFrom('База знаний'));
    dispatch(appBurgerMenuActive(false));
    return () => {
      dispatch(appBurgerMenuActive(false));
    };
  }, [dispatch]);

  return (
    <div className='knowledge-base'>
      <Tabs />
      <ButtonsBlock />
      <CreateAndEditModal />
      <ConfirmDeleteModal />
      <CalcPriceModal />
    </div>
  );
};

export default KnowledgeBase;
