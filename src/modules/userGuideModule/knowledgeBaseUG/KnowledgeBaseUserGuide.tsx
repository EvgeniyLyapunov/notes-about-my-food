import { FC } from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';

import './knowledge-base-ug.scss';

const KnowledgeBaseUserGuide: FC = () => {
  const pageFrom = useAppSelector((state) => state.headerSlice.pageFrom);
  return (
    <div className='knowledge-base-ug'>
      <div className='knowledge-base-ug__header'>
        <span className='knowledge-base-ug__header-icon'></span>
        <h2 className='knowledge-base-ug__header-title'>База Знаний</h2>
      </div>
      <p className='knowledge-base-ug__text'>
        База Знаний&nbsp;&mdash; это список продуктов, каждый элемент которого
        состоит из: <br /> -&nbsp;&nbsp;&nbsp; названия продукта,
        <br /> - <span className='text-icon text-icon_energy'></span> -
        количества ККал в&nbsp;100гр;
        <br /> - <span className='text-icon text-icon_price'></span> - цены
        за&nbsp;100гр.
      </p>
      <h3 className='knowledge-base-ug__subtitle'>Про разделы</h3>
      <p className='knowledge-base-ug__text'>
        База Знаний разделена на&nbsp;три раздела: &laquo;Продукты&raquo;,
        &laquo;Наборы&raquo;, &laquo;Рецепты&raquo;.
      </p>
      <p className='knowledge-base-ug__text'>
        Раздел &laquo;Продукты&raquo;&nbsp;&mdash; сюда добавляются элементы,
        количество которых в разных приёмах пищи может быть разным.
        Например&nbsp;&mdash; хлеб, помидоры, сыр, рис и&nbsp;т.д.
        Соответственно, указываются ККал на&nbsp;100гр.&nbsp;и&nbsp;цена
        за&nbsp;100гр. продукта.
      </p>
      <p className='knowledge-base-ug__text'>
        Раздел &laquo;Наборы&raquo;&nbsp;&mdash; создан для продуктов, которые
        в&nbsp;приёме пищи идут не&nbsp;на вес, а&nbsp;за&nbsp;штуку.
        Например&nbsp;&mdash; пачка Доширака, или чашка кофе с&nbsp;сахаром.
        ККал и&nbsp;цена указываются не&nbsp;за&nbsp;100гр,
        а&nbsp;за&nbsp;единицу.
      </p>
      <p className='knowledge-base-ug__text'>
        Раздел &laquo;Рецепты&raquo; будет реализован в&nbsp;следующих
        обновлениях приложения.
      </p>
      <h3 className='knowledge-base-ug__subtitle'>Добавление в Базу Знания</h3>
      <p className='knowledge-base-ug__text'>
        Пользователь создаёт Базу Знаний сам. Для добавления записи нужно
        выбрать раздел&nbsp;&mdash; &laquo;Продукты&raquo; или
        &laquo;Наборы&raquo;, нажать кнопку &laquo;Добавить&raquo; в&nbsp;нижнем
        правом углу и&nbsp;вписать название продукта, данные о&nbsp;калориях
        и&nbsp;цену.
      </p>
      <p className='knowledge-base-ug__text'>
        Данные о&nbsp;количестве ККал на&nbsp;100гр. можно посмотреть
        в&nbsp;интернете или на упаковке продукта.
      </p>
      <h3 className='knowledge-base-ug__subtitle'>Про добавление цены</h3>
      <p className='knowledge-base-ug__text'>
        Цена вносится двумя способами:
        <br />
        1 - Непосредственно цена за&nbsp;100гр. продукта;
        <br />2 - Нажатием на&nbsp;иконку &laquo;Калькулятор&raquo;
        <span className='text-icon text-icon_calc'></span> вызывается окно,
        в&nbsp;котором вписываются стоимость за&nbsp;единицу товара,
        например&nbsp;&mdash; пачка печений, и&nbsp;вес единицы товара,
        например&nbsp;&mdash; пачка печений весит 230гр. Дальше цена посчитается
        автоматически.
      </p>
      <p className='knowledge-base-ug__text'>
        Во вкладке "Наборы" цена вносится за единицу продукта.
      </p>
      <p className='knowledge-base-ug__text'>
        Данные о&nbsp;цене&nbsp;&mdash; необязательный параметр. Если
        не&nbsp;вносить в&nbsp;свою Базу Знания цену при добавлении продукта,
        программа просто не&nbsp;будет расчитывать стоимость приёма пищи.
      </p>
      <h3 className='knowledge-base-ug__subtitle'>
        Редактирование Базы Знания
      </h3>
      <p className='knowledge-base-ug__text'>
        Любой добавленный в&nbsp;Базу Знания продукт можно удалить{' '}
        <span className='text-icon text-icon_trash'></span> или отредактировать{' '}
        <span className='text-icon text-icon_edit'></span> , нажав в&nbsp;его
        поле соответствующую иконку.
      </p>
      <h3 className='knowledge-base-ug__subtitle'>Доступность Базы Знания</h3>
      <p className='knowledge-base-ug__text'>
        К&nbsp;Базе Знания всегда есть доступ из&nbsp;всех частей приложения.
        Меню доступа <span className='text-icon text-icon_menu'></span>{' '}
        находится в&nbsp;правом верхнем углу.
      </p>
      <p className='knowledge-base-ug__text'>
        Вкладки &laquo;Наборы&raquo; и&nbsp;&laquo;Рецепты&raquo; будут доступны
        в&nbsp;следующих версиях приложения.
      </p>
      {pageFrom === 'База знаний' ? (
        <>
          <div className='knowledge-base-ug__end-section'>
            <span className='knowledge-base-ug__end-section-flower'></span>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default KnowledgeBaseUserGuide;
