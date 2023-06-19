import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { totalClearLocalStorage } from '../../../../utils/browserStorage';

import {
  setConfirmLogoutVisible,
  setSelectAuthVisible,
  setUser,
} from '../../../../redux/slices/AuthSlice';
import { resetKnowledgeBaseToInitState } from '../../../../redux/slices/knowledgeBaseDataSlice';
import { resetMyDayToInitState } from '../../../../redux/slices/myDayDataSlice';
import { resetStatisticToInitState } from '../../../../redux/slices/statisticSlice';

import './confirm-logout.scss';

const ConfirmLogoutModal: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isVisible = useAppSelector(
    (state) => state.authSlice.isConfirmLogoutVisible
  );

  const modalClasses = classNames({
    'confirm-logout': true,
    'confirm-logout_active': isVisible,
  });

  const handleCancel = () => {
    dispatch(setConfirmLogoutVisible(false));
  };

  const handleLogout = () => {
    dispatch(setUser(undefined));
    totalClearLocalStorage();
    dispatch(resetKnowledgeBaseToInitState());
    dispatch(resetMyDayToInitState());
    dispatch(resetStatisticToInitState());
    dispatch(setConfirmLogoutVisible(false));
    dispatch(setSelectAuthVisible(false));
    navigate('/');
  };

  return (
    <div className={modalClasses}>
      <div className='confirm-logout__window'>
        <span className='confirm-logout__text'>Подтвердите выход!</span>
        <div className='confirm-logout__btn-block'>
          <button
            className='confirm-logout__btn confirm-logout__btn_cancel'
            onClick={handleCancel}
          ></button>
          <button
            className='confirm-logout__btn confirm-logout__btn_ok'
            onClick={handleLogout}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
