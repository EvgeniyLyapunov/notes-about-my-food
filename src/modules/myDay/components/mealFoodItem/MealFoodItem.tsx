import { FC } from 'react';

import './meal-food-item';

const MealFoodItem: FC = () => {
  return (
    <div className='food-item'>
      <input
        className='food-item__name'
        type='text'
        readOnly
        name='name'
        id='name'
        placeholder='добавить продукт'
      />
      <span className='food-item__weight'></span>
      <span className='food-item__calories'></span>
    </div>
  );
};

export default MealFoodItem;
