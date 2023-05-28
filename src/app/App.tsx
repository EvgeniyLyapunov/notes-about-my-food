import { FC, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import Header from './components/header/Header';
import ComponentRoutes from './components/componentRoutes/ComponentRoutes';

import { IDataBaseItem } from '../models/modelTypes';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

import { setListFromStorage } from '../redux/slices/knowledgeBaseDataSlice';
import { getKnowledgeBaseList } from '../redux/asyncThunks/getKnowledgeBaseList';
import { setDataFromLocalStorage } from '../redux/slices/myDayDataSlice';

import { postMyDay } from '../redux/asyncThunks/postMyDay';

import {
  knowledgeBaseLoadState,
  myDayLoadState,
} from '../utils/browserStorage';

import { createMyDayForDB } from '../utils/createMyDayForDB';

import './app.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.globalSlice.userId);

  // проверка и работа с localStorage
  useEffect(() => {
    const localData = knowledgeBaseLoadState();
    if (localData) {
      dispatch(setListFromStorage(localData as IDataBaseItem[]));
    } else {
      dispatch(getKnowledgeBaseList(user as string));
    }
    const localMyDay = myDayLoadState();
    // если в localStorage есть данные не на текущую дату
    if (localMyDay && localMyDay.date !== new Date().toLocaleDateString()) {
      // загрузка в БД
      dispatch(postMyDay(createMyDayForDB(localMyDay, user as string)));
    } else if (
      // если в localStorage сохранены данные на текущую дату
      localMyDay &&
      localMyDay.date === new Date().toLocaleDateString()
    ) {
      // инициализация store
      dispatch(setDataFromLocalStorage());
    }
  }, [dispatch]);
  return (
    <div className='App'>
      <HashRouter>
        <div className='container'>
          <Header />
          <ComponentRoutes />
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
