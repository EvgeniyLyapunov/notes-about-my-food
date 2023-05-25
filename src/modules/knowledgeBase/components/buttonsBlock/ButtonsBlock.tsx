import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { setCreateItemModalVisible } from '../../../../redux/slices/knowledgeBaseViewSlice';

import './buttons-block.scss';

const ButtonsBlock: FC = () => {
  const dispatch = useAppDispatch();

  const handleCreateItem = (): void => {
    dispatch(setCreateItemModalVisible(true));
  };

  return (
    <div className='buttons-block'>
      <Link className='buttons-block__btn' to={'/'}>
        Назад
      </Link>
      <button className='buttons-block__btn' onClick={handleCreateItem}>
        Добавить
      </button>
    </div>
  );
};

export default ButtonsBlock;
