import { FC } from 'react';

import { BaseItem } from '../../../../models/modelTypes';

import './base-list-item.scss';

const BaseListItem: FC<BaseItem> = ({ name, calories, price, id }) => {
  return (
    <div className='base-list-item'>
      <div className='base-list-item__infos'>
        <span className='base-list-item__field base-list-item__field-name'>
          {name}
        </span>
        <span className='base-list-item__field base-list-item__field-calories'>
          {calories}
        </span>
        {price !== 0 ? (
          <span className='base-list-item__field base-list-item__field-price'>
            {price}
          </span>
        ) : null}
      </div>
      <div className='base-list-item__btns'>
        <span className='base-list-item__button base-list-item__edit'></span>
        <span className='base-list-item__button base-list-item__delete'></span>
      </div>
    </div>
  );
};

export default BaseListItem;
