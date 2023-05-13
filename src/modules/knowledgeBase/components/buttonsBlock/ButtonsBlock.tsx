import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
// import { setAddItemModalVisible } from '../../../../redux/slices/knowledgeBaseSlice';
import { setAddItemModalVisible } from '../../../../redux/slices/localKnowledgeBaseSlise';

import './buttons-block.scss';

const ButtonsBlock: FC = () => {
  const dispatch = useAppDispatch();

  const handleAddItem = (): void => {
    dispatch(setAddItemModalVisible(true));
  };

  return (
    <div className='buttons-block'>
      <Link className='buttons-block__btn' to={'/'}>
        Назад
      </Link>
      <button className='buttons-block__btn' onClick={handleAddItem}>
        Добавить
      </button>
    </div>
  );
};

export default ButtonsBlock;
