import { FC, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import Header from './components/header/Header';
import ComponentRoutes from './components/componentRoutes/ComponentRoutes';

import { useAppDispatch } from '../hooks/reduxHooks';

import { setUser } from '../redux/slices/AuthSlice';

import { userLoadState } from '../utils/browserStorage';

import './app.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = userLoadState();
    if (user) {
      dispatch(setUser(user));
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
