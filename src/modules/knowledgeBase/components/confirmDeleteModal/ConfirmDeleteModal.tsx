import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reduxHooks';
import classNames from 'classnames';
import { setConfirmForDeleteModalVisible } from '../../../../redux/slices/knowledgeBaseViewSlice';

import { resetBaseItemIdForDelete } from '../../../../redux/slices/knowledgeBaseDataSlice';
import { deleteKnowledgeBaseItem } from '../../../../redux/asyncThunks/deleteKnowledgeBaseItem';

import './confirm-delete.scss';

const ConfirmDeleteModal: FC = () => {
  const isVisible = useAppSelector(
    (store) => store.knowledgeBaseViewSlice.isConfirmDeleteVisible
  );

  const deleteItemId = useAppSelector(
    (store) => store.knowledgeBaseDataSlice.baseItemIdForDelete
  );

  const dispatch = useAppDispatch();

  const modalClasses = classNames({
    'confirm-delete': true,
    'confirm-delete_active': isVisible,
  });

  const handleCancel = () => {
    dispatch(setConfirmForDeleteModalVisible(false));
    dispatch(resetBaseItemIdForDelete());
  };

  const handleDelete = () => {
    dispatch(
      deleteKnowledgeBaseItem(JSON.stringify({ id: deleteItemId as number }))
    );
    dispatch(setConfirmForDeleteModalVisible(false));
    dispatch(resetBaseItemIdForDelete());
  };

  return (
    <div className={modalClasses}>
      <div className='confirm-delete__window'>
        <span className='confirm-delete__text'>Подтвердите удаление!</span>
        <div className='confirm-delete__btn-block'>
          <button
            className='confirm-delete__btn confirm-delete__btn_cancel'
            onClick={handleCancel}
          ></button>
          <button
            className='confirm-delete__btn confirm-delete__btn_ok'
            onClick={handleDelete}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
