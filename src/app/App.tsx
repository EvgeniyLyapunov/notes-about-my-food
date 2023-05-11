import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import ComponentRoutes from './components/componentRoutes/ComponentRoutes';

import './app.scss';

const App: FC = () => {
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
