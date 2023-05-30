import { FC } from 'react';

import './statistic-ug.scss';

const StatisticUserGuide: FC = () => {
  return (
    <div className='statistic-ug'>
      <div className='statistic-ug__header'>
        <span className='statistic-ug__header-icon'></span>
        <h2 className='statistic-ug__header-title'>Статистика</h2>
      </div>
      <p className='statistic-ug__text'>
        Окно &laquo;Статистика&raquo; будет развиваться в&nbsp;следующих релизах
        программы, на&nbsp;основании отзывов и&nbsp;потребностей реальных
        пользователей.
      </p>
      <h3 className='statistic-ug__subtitle'>Что сейчас</h3>
      <p className='statistic-ug__text'>
        На&nbsp;данный момент в&nbsp;этом окне отображается список результатов
        по&nbsp;прошедшим дням. Каждый объект списка содержит дату, общее
        количество калорий на&nbsp;эту дату, общую цену приёмов пищи на&nbsp;эту
        дату.
      </p>
      <div className='statistic-ug__end-section'>
        <span className='statistic-ug__end-section-flower'></span>
      </div>
    </div>
  );
};

export default StatisticUserGuide;
