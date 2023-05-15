import { FC } from 'react';

import { IMeal } from '../../../../models/modelTypes';

import Meal from '../meal/Meal';

import './meals-list.scss';

interface IMealsListProps {
  mealsItems: IMeal[];
}

const MealsList: FC<IMealsListProps> = ({ mealsItems }) => {
  return (
    <div className='meals-list'>
      {mealsItems.map((item, i) => {
        return <Meal key={i} />;
      })}
    </div>
  );
};
export default MealsList;
