import { FC, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import ComponentRoutes from './components/componentRoutes/ComponentRoutes';

import { IDataBaseItem } from '../models/modelTypes';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

import { setListFromStorage } from '../redux/slices/knowledgeBaseDataSlice';
import { getKnowledgeBaseList } from '../redux/asyncThunks/getKnowledgeBaseList';

import { knowledgeBaseLoadState } from '../utils/browserStorage';

import './app.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.globalSlice.userId);
  useEffect(() => {
    const localData = knowledgeBaseLoadState();
    if (localData) {
      dispatch(setListFromStorage(localData as IDataBaseItem[]));
    } else {
      dispatch(getKnowledgeBaseList(user as string));
    }
  }, [dispatch]);
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='container'>
          <Header />
          <ComponentRoutes />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
