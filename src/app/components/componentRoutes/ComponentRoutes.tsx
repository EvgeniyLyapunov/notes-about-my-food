import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import StartPage from '../startPage/StartPage';

const ComponentRoutes: FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<StartPage />} />
      </Routes>
    </>
  );
};

export default ComponentRoutes;
