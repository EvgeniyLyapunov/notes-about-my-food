import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/reduxHooks';

import './buttons-block.scss';

const ButtonsBlock: FC = () => {
  const dispatch = useAppDispatch();

  const handle = (): void => {};

  return (
    <div className='buttons-block'>
      <Link className='buttons-block__btn' to={'/'}>
        Назад
      </Link>
      <button className='buttons-block__btn' onClick={handle}>
        Добавить
      </button>
    </div>
  );
};

export default ButtonsBlock;
