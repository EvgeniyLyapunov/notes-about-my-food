import { FC, useEffect } from 'react';

import { useAppDispatch } from '../../hooks/reduxHooks';
import {
  appBurgerMenuActive,
  changePageName,
  hidingActivePageLink,
} from '../../redux/slices/headerSlice';
import Tabs from './components/tabs/Tabs';
import ButtonsBlock from './components/buttonsBlock/ButtonsBlock';
import AddAndEditModal from './components/addAndEditModal/addAndEditModal';
import ConfirmDeleteModal from './components/confirmDeleteModal/ConfirmDeleteModal';
import CalcPriceModal from './components/calcPriceModal/CalcPriceModal';

import './knowledge-base.scss';

const KnowledgeBase: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hidingActivePageLink('knowledgeBase'));
    dispatch(changePageName('База знаний'));
    dispatch(appBurgerMenuActive(false));
    return () => {
      dispatch(appBurgerMenuActive(false));
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className='knowledge-base'>
      <Tabs />
      <ButtonsBlock />
      <AddAndEditModal />
      <ConfirmDeleteModal />
      <CalcPriceModal />
    </div>
  );
};

export default KnowledgeBase;
