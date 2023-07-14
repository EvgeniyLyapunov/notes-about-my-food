import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reduxHooks';
import classNames from 'classnames';
import { setConfirmForDeleteModalVisible } from '../../../../redux/slices/dataViewSlice';

import { resetBaseItemIdForDelete } from '../../../../redux/slices/dataFoodSlice';
import { resetSetsIdForDelete } from '../../../../redux/slices/dataSetsSlice';
import { deleteBaseItem } from '../../../../redux/asyncThunks/deleteBaseItem';
import { deleteSet } from '../../../../redux/asyncThunks/deleteSet';

import './confirm-delete.scss';

const ConfirmDeleteModal: FC = () => {
  const activeTab = useAppSelector((store) => store.dataViewSlice.activeTab);
  const isVisible = useAppSelector(
    (store) => store.dataViewSlice.isConfirmDeleteVisible
  );

  const deleteFoodItemId = useAppSelector(
    (store) => store.dataFoodSlice.baseItemIdForDelete
  );
  const deleteSetItemId = useAppSelector(
    (store) => store.dataSetsSlice.setsIdForDelete
  );

  const dispatch = useAppDispatch();

  const modalClasses = classNames({
    'confirm-delete': true,
    'confirm-delete_active': isVisible,
  });

  const handleCancel = () => {
    dispatch(setConfirmForDeleteModalVisible(false));
    dispatch(resetBaseItemIdForDelete());
    dispatch(resetSetsIdForDelete());
  };

  const handleDelete = () => {
    switch (activeTab) {
      case 'food':
        dispatch(
          deleteBaseItem(JSON.stringify({ id: deleteFoodItemId as number }))
        );
        dispatch(resetBaseItemIdForDelete());
        break;
      case 'set':
        dispatch(deleteSet(JSON.stringify({ id: deleteSetItemId as number })));
        dispatch(resetSetsIdForDelete());
        break;
    }
    dispatch(setConfirmForDeleteModalVisible(false));
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
