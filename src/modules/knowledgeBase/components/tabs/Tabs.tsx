import { FC, useState } from 'react';
import classNames from 'classnames';

import { useAppSelector } from '../../../../hooks/reduxHooks';
import { useAppDispatch } from '../../../../hooks/reduxHooks';

import { TypeActiveTab } from '../../../../models/modelTypes';

import { setViewTab } from '../../../../redux/slices/dataViewSlice';

import BaseList from '../baseList/BaseList';

import './tabs.scss';

type ActiveTabs = {
  food: boolean;
  set: boolean;
  recipe: boolean;
};

const Tabs: FC = () => {
  const dispatch = useAppDispatch();
  const foodItems = useAppSelector(
    (state) => state.dataFoodSlice.baseItemsList
  );
  const setsItems = useAppSelector((state) => state.dataSetsSlice.setsList);

  const activeTabsList: ActiveTabs = { food: true, set: false, recipe: false };
  const [activeTab, setActiveTab] = useState(activeTabsList);

  const onTabsChange = (e: React.MouseEvent<HTMLElement>) => {
    const changedActiveTabsList = { ...activeTab };
    let k: keyof typeof changedActiveTabsList;
    for (k in changedActiveTabsList) {
      if (k === e.currentTarget.id) {
        changedActiveTabsList[k] = true;
        dispatch(setViewTab(e.currentTarget.id as TypeActiveTab));
      } else {
        changedActiveTabsList[k] = false;
      }
    }
    setActiveTab(changedActiveTabsList);
  };

  const tabItemFood = classNames({
    'tabs__panel-item': true,
    'tabs__panel-item_active': activeTab.food,
  });

  const tabItemSet = classNames({
    'tabs__panel-item': true,
    'tabs__panel-item_active': activeTab.set,
  });

  const tabItemRecipe = classNames({
    'tabs__panel-item': true,
    'tabs__panel-item_active': activeTab.recipe,
  });

  const tabContantFood = classNames({
    tabs__contant: true,
    tabs__contant_active: activeTab.food,
  });

  const tabContantSet = classNames({
    tabs__contant: true,
    tabs__contant_active: activeTab.set,
  });

  const tabContantRecipe = classNames({
    tabs__contant: true,
    tabs__contant_active: activeTab.recipe,
  });

  return (
    <div className='tabs'>
      <ul className='tabs__panel'>
        <li className={tabItemFood} onClick={(e) => onTabsChange(e)} id='food'>
          Продукты
        </li>
        <li className={tabItemSet} onClick={(e) => onTabsChange(e)} id='set'>
          Наборы
        </li>
        <li
          className={tabItemRecipe}
          onClick={(e) => onTabsChange(e)}
          id='recipe'
        >
          Рецепты
        </li>
      </ul>

      <div className={tabContantFood}>
        <BaseList items={foodItems} />
      </div>
      <div className={tabContantSet}>
        <BaseList items={setsItems} />
      </div>
      <div className={tabContantRecipe}>Рецепты</div>
    </div>
  );
};

export default Tabs;
