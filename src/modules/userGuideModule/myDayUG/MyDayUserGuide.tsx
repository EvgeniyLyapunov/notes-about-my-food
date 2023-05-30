import { FC } from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';

import './my-day-ug.scss';

const MyDayUserGuide: FC = () => {
  const pageFrom = useAppSelector((state) => state.headerSlice.pageFrom);
  return (
    <div className='my-day-ug'>
      <div className='my-day-ug__header'>
        <span className='my-day-ug__header-icon'></span>
        <h2 className='my-day-ug__header-title'>Мой день</h2>
      </div>
      <p className='my-day-ug__text'>
        Мой День&nbsp;&mdash; это раздел, где используя Базу Знания можно точно
        видеть калорийность (и&nbsp;цену) любого приема пищи.
      </p>
      <h3 className='my-day-ug__subtitle'>Название приёма пищи</h3>
      <p className='my-day-ug__text'>
        Каждый приём пищи в&nbsp;разделе Мой День представлен блоком,
        у&nbsp;которого есть имя по&nbsp;умолчанию&nbsp;&mdash; &laquo;Приём
        пищи&raquo;. Иконка <span className='text-icon text-icon_edit'></span>{' '}
        позволяет изменить название приёма пищи.
      </p>
      <h3 className='my-day-ug__subtitle'>Добавление продукта</h3>
      <p className='my-day-ug__text'>
        Ниже названия приёма пищи располагается иконка
        <span className='text-icon text-icon_add'></span>, нажав
        на&nbsp;которую, можно открыть окно добавления продукта, который
        является частью этого приёма пищи.
      </p>
      <p className='my-day-ug__text'>
        В&nbsp;окне &laquo;Добавить продукт&raquo; нажатие на&nbsp;иконку{' '}
        <span className='text-icon text-icon_add'></span> открывает список
        продуктов из&nbsp;Базы Знания.
      </p>
      <p className='my-day-ug__text'>
        <strong>Важно!</strong> Вручную нельзя добавить продукт в&nbsp;список
        Приёма пищи, только выбрав из&nbsp;уже сохранённых в&nbsp;Базе Знания.
      </p>
      <p className='my-day-ug__text'>
        Вес добавляемого продукта вводится в&nbsp;граммах. Нажатие иконки{' '}
        <span className='text-icon text-icon_ok'></span> возвращает
        в&nbsp;главное окно, где уже отображается выбранный продукт. Справа
        от&nbsp;наименования продукта выводися введённое количество
        грамм&nbsp;&nbsp;&nbsp;&mdash;{' '}
        <span className='text-icon text-icon_weight'></span> и&nbsp;расчитанная
        программой калорийность&nbsp;&nbsp;&nbsp;&mdash;{' '}
        <span className='text-icon text-icon_calories'></span>.
      </p>
      <h3 className='my-day-ug__subtitle'>Общие значения</h3>
      <p className='my-day-ug__text'>
        Ниже, под списком выбранных продуктов, выводятся общие
        значения&nbsp;&nbsp;&nbsp;&mdash;
        <span className='text-icon text-icon_calories'></span> калорийность и{' '}
        <span className='text-icon text-icon_price'></span>цена. Общие значения
        расчитываются программой на&nbsp;основе данных из&nbsp;Базы Знания
        и&nbsp;введённом весе.
      </p>
      <h3 className='my-day-ug__subtitle'>Панель редактирования</h3>
      <p className='my-day-ug__text'>
        В&nbsp;самом низу блока создания текущего приёма пищи есть панель
        иконок. Ежедневно, при создании первого приёма пищи их&nbsp;две:{' '}
        <span className='text-icon text-icon_eraser'></span> &mdash;&nbsp;&nbsp;
        ластик для редактирования списка, и&nbsp;
        <span className='text-icon text-icon_end'></span>{' '}
        &mdash;&nbsp;&nbsp;иконка сохранить, завершить &laquo;приём пищи&raquo;.
      </p>
      <h3 className='my-day-ug__subtitle'>Удаление "Приёма пищи"</h3>
      <p className='my-day-ug__text'>
        После сохранения первого за&nbsp;текущий день приёма пищи,
        на&nbsp;панели редактирования появляется иконка удаления нового шаблона
        &quot;Приёма пищи"&nbsp;&nbsp;&nbsp;&mdash;
        <span className='text-icon text-icon_delete'></span>. Она удаляет новый
        шаблон, и&nbsp;возвращает в&nbsp;режим редактирования последний
        сохранённый &laquo;Приём пищи&raquo;.
      </p>
      <h3 className='my-day-ug__subtitle'>Удаление продукта</h3>
      <p className='my-day-ug__text'>
        Для удаления продукта из&nbsp;списка в&nbsp;текущем &laquo;приёме
        пищи&raquo;&nbsp;&nbsp;&nbsp;&mdash;
        <span className='text-icon text-icon_eraser'></span>, ластик. Когда
        ластик подсвечен жёлтым&nbsp;&mdash;
        <span className='text-icon text-icon_eraser-active'></span>, значит
        активирован режим удаления элемента списка. При клике на&nbsp;продукт
        из&nbsp;списка произойдёт его удаление. Общие калорийность и&nbsp;цена
        будут автоматически пересчитаны.
      </p>
      <h3 className='my-day-ug__subtitle'>Уникальность продукта</h3>
      <p className='my-day-ug__text'>
        В&nbsp;список продуктов в&nbsp;&laquo;приём пищи&raquo; можно внести
        только уникальные записи из&nbsp;&laquo;Базы Знания&raquo;, т.е. одно
        наименование продукта не&nbsp;может повторяться в&nbsp;списке.
      </p>
      <h3 className='my-day-ug__subtitle'>Редактирование продукта</h3>
      <p className='my-day-ug__text'>
        При повторном выборе уже добавленного в&nbsp;список продукта,
        в&nbsp;списке остаётся только последний вариант, а&nbsp;общие значения
        калорий и&nbsp;цены пересчитываются с&nbsp;учётом его данных.
      </p>
      <p className='my-day-ug__text'>
        Это ещё один способ редактировать список.
      </p>
      <h3 className='my-day-ug__subtitle'>Кнопка "Просмотр"</h3>
      <p className='my-day-ug__text'>
        В&nbsp;нижней части окна &laquo;Мой день&raquo; находятся две кнопки.
        &laquo;Назад&raquo;&nbsp;&mdash; возврат на&nbsp;главный экран,
        и&nbsp;неактивная кнопка &laquo;Просмотр&raquo;. После первого
        сохранения &laquo;Приёма пищи&raquo; кнопка &laquo;Просмотр&raquo;
        становится активной и&nbsp;переключает на&nbsp;окно просмотра
        сохранённых приёмов пищи за&nbsp;текущий день.
      </p>
      {pageFrom === 'Мой день' ? (
        <>
          <div className='my-day-ug__end-section'>
            <span className='my-day-ug__end-section-flower'></span>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MyDayUserGuide;
