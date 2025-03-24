import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../../utils/fetchData';
import styles from './style.module.scss';

import process from 'process';
import env from "react-dotenv";

import {
  AddMoreBtn,
  ComponentDate,
  ComponentSearch,
  AddPopupContent,
  WorkerItem,
  NoteBody,
  ObjectSelect
} from '../../components';

import useDateStore from '../../store/CalendarStore';
import useDateSingeStore from '../../store/CalendarSingleStore';

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const Object = () => {

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const { id } = useParams();
  const { dates } = useDateStore();
  const { date } = useDateSingeStore();
  const { error, setError } = useState();

  // Число дней в месяце
  const [numDays, setNumDays] = useState(daysInMonth(new Date().getMonth() + 1, new Date().getFullYear()));

  // Получаем текущую дату (число)
  const currentDay = new Date().getDate();

  // Разбиение
  let days = [];

  if (dates.length == 0) {
    days = Array.from({ length: numDays }, (_, i) => i + 1);
  } else {
    days = Array.from({ length: dates.length }, (_, i) => i + 1);
  }

  const daysFullDate = dates.length > 0
    ? dates.map(date => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    })
    : Array.from({ length: numDays }, (_, i) => {
      const day = String(i + 1).padStart(2, '0');
      const month = String(currentMonth).padStart(2, '0');
      return `${day}.${month}.${currentYear}`;
    });

  // Формируем часть URL с фильтрами по датам
  const dateFilters = daysFullDate
    .map((date, index) => `filters[DayDataDetails][DayInfo][SmenaDetails][SmenaDateDetails][$in][${index}]=${date}`)
    .join('&');

  const populateParams = `populate[DayDataDetails][populate][DayInfo][populate]=*&populate[DayDataDetails][populate][NightInfo][populate]=*&populate[MonthDataTonnaj][populate]=*&populate[DayDataOstatki][populate]=*`;
  const apiUrl = `http://89.104.67.119:1337/api/people?${dateFilters}&${populateParams}`;

  // Разбиение на страницы
  const daysPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  // Находим индекс текущей даты в массиве
  const currentDayIndex = days.indexOf(currentDay) + 1;

  let startIndex = currentDayIndex - 2;
  if (startIndex < 0) startIndex = 0;

  let endIndex = startIndex + daysPerPage;
  if (endIndex > days.length) endIndex = days.length;

  let displayedDays = days.slice(startIndex, endIndex);

  const [popupActive, setPopupActive] = useState(false);
  const [noteBodyActive, setNoteBodyActive] = useState(false);

  const [workers, setWorkers] = useState([]);

  const handleAddWorker = () => {
    setWorkers([...workers, { id: workers.length + 1, name: '' }]);
  };

  const handleNext = () => {
    if (endIndex < days.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClick = () => {
    setPopupActive(true);
  };

  const handleClickNote = () => {
    setNoteBodyActive(true);
  };

  useEffect(() => {
    if (dates.length > 0) {
      const firstDate = dates[0];
      const first_month = firstDate.getMonth() + 1;
      const first_year = firstDate.getFullYear();

      // Перезаписываем numDays
      setNumDays(daysInMonth(first_month, first_year));

      // Находим индекс текущего дня
      const currentDayIndex = days.indexOf(currentDay);
      if (currentDayIndex !== -1) {
        // Вычисляем начальную страницу
        const initialPage = Math.floor(currentDayIndex / daysPerPage);
        setCurrentPage(initialPage);
      }
    }
  }, [dates, currentDay]);

  // /api/objects/:id
  const domain = 'http://89.104.67.119:1337';
  const url = `${domain}/api/objects?populate=*`;

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const data = await fetchData(`http://89.104.67.119:1337/api/objects?filters[id][$eq]=${id}&populate[workers][populate]=*`);
        setWorkers(data[0].workers);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchAndSetData();
  }, [id])


  return (
    <section className={styles.main_section}>
      <div className="container">
        <div className={`${styles.header_wrapper} sticky-header`}>
          <header className={styles.top}>
            <ObjectSelect />
            <div className={styles.top_wrapper}>
              <ComponentSearch />
              <ComponentDate />
            </div>
          </header>
          <div className={styles.table}>
            <div className={styles.table_header}>
              <ul className={`${styles.day_list} ${styles.wrapper_day}`}>
                <p className={styles.title_table}>ФИО/должность</p>
                {displayedDays.map((day, idx) => (
                  <li className={styles.item_table} key={idx}>
                    <div>{dates.length > 0 ? dates[idx].getDate() : day}</div>
                  </li>
                ))}

                <div className={styles.pagination}>
                  <button onClick={handlePrevious} disabled={currentPage === 0}>
                    <img style={{ rotate: '-180deg' }} src='/next.svg' alt='next' />
                  </button>

                  <button onClick={handleNext} disabled={endIndex >= days.length}>
                    <img src='/next.svg' alt='next' />
                  </button>
                </div>
              </ul>

              <ul className={`${styles.day_list} ${styles.wrapper_time}`}>
                <p className={styles.title_table}></p>
                {displayedDays.map((day) => (
                  <li className={styles.item_table} key={day}>
                    <div className={styles.time_item}>
                      <img src='/sun.svg' alt='' />
                      <p style={{ color: '#F2B174' }}>День</p> | <img src='/moon.svg' alt='' />
                      <p style={{ color: '#1F2433' }}>Ночь</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {workers.map((worker, idx) => (
          <WorkerItem
            key={idx}
            id={worker.id}
            setWorkers={setWorkers}
            workers={workers}
            worker={worker}
            daysFullDate={daysFullDate}
            displayedDays={displayedDays}
            handleClick={handleClick}
            handleClickNote={handleClickNote}
            active={popupActive}
            setActive={setPopupActive}
            title={'Сотрудник'}
          />
        ))}

        <div className={styles.add_workers}>
          <AddMoreBtn
            onHandleClick={handleAddWorker}
            title={'Добавить сотрудника'}
          />
        </div>
      </div>
      <NoteBody
        active={noteBodyActive}
        setActive={setNoteBodyActive}
      />
    </section>
  );
};

export default Object;