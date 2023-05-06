import { FC } from 'react';
import { Link } from 'react-router-dom';

import './buttons-block.scss';

const ButtonsBlock: FC = () => {
  return (
    <div className='buttons-block'>
      <Link className='buttons-block__btn' to={'/'}>
        Назад
      </Link>
      <button className='buttons-block__btn'>Добавить</button>
    </div>
  );
};

export default ButtonsBlock;
