import { FC, useEffect } from 'react';

import { useAppDispatch } from '../../hooks/reduxHooks';
import { activeMenu } from '../../redux/slices/globalSlice';
import {
  appBurgerMenuActive,
  changePageName,
  hidingActivePageLink,
} from '../../redux/slices/headerSlice';
import Tabs from './components/tabs/Tabs';
import ButtonsBlock from './components/buttonsBlock/ButtonsBlock';
import AddAndEditModal from './components/addAndEditModal/addAndEditModal';

import './knowledge-base.scss';

const KnowledgeBase: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hidingActivePageLink('knowledgeBase'));
    dispatch(activeMenu('appMenu'));
    dispatch(changePageName('База знаний'));

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
    </div>
  );
};

export default KnowledgeBase;
