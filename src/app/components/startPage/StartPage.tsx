import { FC } from 'react';

import './start-page.scss';
import mainPicture from '../../../assets/images/mainScreen/main-pic.png';

const StartPage: FC = () => {
  return (
    <div className='start-page'>
      <div className='container'>
        <div className='start-page__title-box'>
          <span className='start-page__title start-page__title-notes'>
            Notes
          </span>
          <span className='start-page__title start-page__title-about'>
            About
          </span>
          <span className='start-page__title start-page__title-my'>My</span>
          <span className='start-page__title start-page__title-food'>Food</span>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
