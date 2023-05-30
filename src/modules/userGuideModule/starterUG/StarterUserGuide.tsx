import { FC } from 'react';

import './starter-ug.scss';

const StarterUserGuide: FC = () => {
  return (
    <div className='starter-ug'>
      <div className='starter-ug__header'>
        <span className='starter-ug__header-icon'></span>
        <h2 className='starter-ug__header-title'>Руководство пользователя</h2>
      </div>
      <p className='starter-ug__text'>
        Notes About My&nbsp;Food, или Заметки о&nbsp;моём питании&nbsp;&mdash;
        хороший инструмент для контроля за&nbsp;калориями в&nbsp;личном
        ежедневном питании. Дополнительная возможность&nbsp;&mdash; видеть
        стоимость отдельного приёма пищи.
      </p>
      <p className='starter-ug__text'>
        В&nbsp;приложении предусмотренна авторизация, которая позволяет
        использовать личную базу знаний и&nbsp;статистику.
      </p>
      <p className='starter-ug__text'>
        К&nbsp;данному руководству всегда есть доступ из&nbsp;всех частей
        приложения. Меню доступа{' '}
        <span className='text-icon text-icon_menu'></span> находится
        в&nbsp;правом верхнем углу.
      </p>
    </div>
  );
};

export default StarterUserGuide;
