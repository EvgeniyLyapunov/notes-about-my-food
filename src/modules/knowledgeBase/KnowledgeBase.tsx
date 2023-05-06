import { FC } from 'react';

import Tabs from './components/tabs/Tabs';
import ButtonsBlock from './components/buttonsBlock/ButtonsBlock';

import './knowledge-base.scss';

const KnowledgeBase: FC = () => {
  return (
    <div className='knowledge-base'>
      <Tabs />
      <ButtonsBlock />
    </div>
  );
};

export default KnowledgeBase;
