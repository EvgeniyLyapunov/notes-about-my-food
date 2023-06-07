import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';

import {
  startBurgerMenuActive,
  setStartBurgerMenuVisible,
} from '../../redux/slices/headerSlice';

import './about.scss';

const About: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // закрываем панель меню
    dispatch(startBurgerMenuActive(false));
    // убираем со страницы кнопку бургера
    dispatch(setStartBurgerMenuVisible(true));
  }, [dispatch]);
  const handleClose = () => {
    dispatch(setStartBurgerMenuVisible(false));
  };
  return (
    <div className='about'>
      <div className='about__content'>
        <div className='about__author'>
          <p className='about__author-info'>
            Автор и&nbsp;разработчик проекта
            &laquo;Notes&nbsp;about&nbsp;my&nbsp;food&raquo;
            <br />
            &nbsp;&mdash;
            <br /> Евгений Ляпунов, Краснодар.
          </p>
        </div>
        <div className='about__descr'>
          <p className='about__descr-text'>
            Приветствую! Это приложение&nbsp;&mdash; прекрасный инструмент
            контроля потребляемых калорий. Концепция и&nbsp;функционал явились
            результатом попыток следить за&nbsp;калорийностью приёмов пищи,
            делая записи в тетрадке и&nbsp;считая на&nbsp;калькуляторе.
          </p>
          <p className='about__descr-text'>
            В&nbsp;процессе разработки и&nbsp;использования этой программы
            появляются идеи, которые обязательно будут реализованы
            в&nbsp;последующих версиях.
          </p>
          <p className='about__descr-text'>
            Отзывы, критика, пожелания и предложения приветствуются. Спасибо за
            Ваш интерес.
          </p>
        </div>
        <ul className='about__contacts'>
          <li className='about__contacts-item'>
            <a
              className='about__contacts-link about__contacts-link_site'
              href='https://little-wing.ru'
            >
              сайт
            </a>
          </li>
          <li className='about__contacts-item'>
            <a
              className='about__contacts-link about__contacts-link_email'
              href='mailto:lyapunovcs@gmail.com'
            >
              почта
            </a>
          </li>
          <li className='about__contacts-item'>
            <a
              className='about__contacts-link about__contacts-link_telegram'
              href='https://t.me/EvgenyLyapunov'
            >
              телеграм
            </a>
          </li>
          <li className='about__contacts-item'>
            <a
              className='about__contacts-link about__contacts-link_github'
              href='https://github.com/EvgeniyLyapunov'
            >
              гитхаб
            </a>
          </li>
        </ul>
      </div>
      <div className='about__buttons-block'>
        <Link className='about__button-close' to={'/'} onClick={handleClose}>
          Закрыть
        </Link>
      </div>
    </div>
  );
};

export default About;
