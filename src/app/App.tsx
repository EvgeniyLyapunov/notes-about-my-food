import { FC, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import ComponentRoutes from './components/componentRoutes/ComponentRoutes';

import { BaseItem } from '../models/modelTypes';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setListFromStorage } from '../redux/slices/localKnowledgeBaseSlise';
import { knowledgeBaseLoadState } from '../utils/browserStorage';

import './app.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const localData = knowledgeBaseLoadState();
    if (localData) {
      dispatch(setListFromStorage(localData as BaseItem[]));
    } else {
      console.log('nothing');
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
