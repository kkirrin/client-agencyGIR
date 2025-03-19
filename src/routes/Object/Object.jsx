import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.scss';

import process from 'process';
import env from "react-dotenv";

import {
  AddMoreBtn,
  ComponentDate,
  ComponentSearch,
  AddPopupContent,
  WorkerItem,
  NoteBody
}
  from '../../components';

import useDateStore from '../../store/CalendarStore';
import { Reorder } from "framer-motion";


function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const Object = () => {
  const { id } = useParams();
  const { dates } = useDateStore();
  const { error, setError } = useState();
  
  // Число
  const [numDays, setNumDays] = useState(daysInMonth(new Date().getMonth() + 1, new Date().getFullYear()));

  const object = { id: 1, name: 'АО "Находкинский морской торговый порт" (УТ-1)' };

  // Разбиение
  let days = [];

  if (dates.length == 0) {
    days = Array.from({ length: numDays }, (_, i) => i + 1);
  } else {
    days = Array.from({ length: dates.length }, (_, i) => i + 1);
  }

  // Разбиение на страницы
  const daysPerPage = 5;


  const [currentPage, setCurrentPage] = useState(0);

  let startIndex = currentPage * daysPerPage;
  let endIndex = Math.min(startIndex + daysPerPage, days.length);
  let displayedDays = days.slice(startIndex, endIndex);

  const [popupActive, setPopupActive] = useState(false);
  const [noteBodyActive, setNoteBodyActive] = useState(false);

  const [workers, setWorkers] = useState([]);

  const handleAddWorker = () => {
    //setWorkers([...workers, { id: workers.length + 1, name: 'Test' }]);
    setWorkers([...workers, { id: workers.length + 1, name: '' }]);
  }

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
  }


  useEffect(() => {
    if (dates.length > 0) {
      const firstDate = dates[0];
      const firstDay = firstDate.getDay();
      const first_month = firstDate.getMonth() + 1;
      const first_year = firstDate.getFullYear();

      // Перезаписываем numDays
      setNumDays(daysInMonth(first_month, first_year));
      setCurrentPage(0)
    }
  }, [dates]);


  useEffect(() => {
    const fetchData = async () => {
   
      try {
        // const apiUrl = `${process.env.REACT_APP_IP_ADDRESS}/api/people?populate=*`;
        const apiUrl = `http://89.104.67.119:1337/api/people?populate[DayDataDetails][populate][DayInfo][populate]=*&populate[DayDataDetails][populate][NightInfo][populate]=*&populate[MonthDataTonnaj][populate]=*&populate[DayDataOstatki][populate]=*`;
        const response = await fetch(apiUrl);

        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setWorkers(data.data);
      } catch (error) {
        setError(error);
        console.error("Ошибка при получении данных:", error);
      } finally {
        // setLoading(false); // Загрузка завершена (успешно или с ошибкой)
      }
    };

    fetchData();
  }, []); //  Важно: 


  return (
    <section className={styles.main_section}>
      <div className="container">
        <div className={`${styles.header_wrapper} sticky-header`}>
          <div className={styles.top}>
            <p className={styles.name_object}>{object.name}</p>
            <div className={styles.top_wrapper}>
              <ComponentSearch />
              <ComponentDate />
            </div>
          </div>
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

                {displayedDays.map((day) => (
                  <li className={styles.item_table} key={day}>
                    <div className={styles.time_item}><img src='/moon.svg' alt='' /><p style={{ color: '#1F2433sun' }}>Ночь</p> | <img src='/sun.svg' alt='' /><p style={{ color: '#F2B174' }}>День</p></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Reorder.Group
          values={workers}
          onReorder={setWorkers}
          className={styles.workers_list}
        >

          {workers.map((worker) => (
            <Reorder.Item key={worker} value={worker}>
              <WorkerItem
                id={worker.id}
                setWorkers={setWorkers}
                workers={workers}
                worker={worker}
                displayedDays={displayedDays}
                handleClick={handleClick}
                handleClickNote={handleClickNote}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <div className={styles.add_workers}>
          <AddMoreBtn
            onHandleClick={handleAddWorker}
            title={'Добавить сотрудника'}
          />
        </div>
      </div>

      <AddPopupContent
        id={''}
        active={popupActive}
        setActive={setPopupActive}
        title={'Сотрудник'}
      />
      <NoteBody
        active={noteBodyActive}
        setActive={setNoteBodyActive}
      />

    </section>
  );
};

export default Object;

