import { FC } from 'react';

import './loading.scss';
import spinner from './spinner.gif';

const Loading: FC = () => {
  return (
    <div className='loading'>
      <img src={spinner} alt='spinner of loading' />
    </div>
  );
};

export default Loading;
