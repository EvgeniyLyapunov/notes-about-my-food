import { FC, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../loading/loading';

const StartPage = lazy(() => import('../startPage/StartPage'));
const Auth = lazy(() => import('../../../modules/authModule/Auth'));
const UserGuide = lazy(
  () => import('../../../modules/userGuideModule/UserGuid')
);
const About = lazy(() => import('../../../modules/userGuideModule/About'));
const KnowledgeBase = lazy(
  () => import('../../../modules/knowledgeBase/KnowledgeBase')
);
const Statistic = lazy(() => import('../../../modules/statistic/Statistic'));
const MyDay = lazy(() => import('../../../modules/myDay/MyDay'));

const ComponentRoutes: FC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/usersguide' element={<UserGuide />} />
          <Route path='/about' element={<About />} />
          <Route path='/knowledgebase' element={<KnowledgeBase />} />
          <Route path='/statistic' element={<Statistic />} />
          <Route path='/myday' element={<MyDay />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default ComponentRoutes;
