import styles from './style.module.scss';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useDataRequestStore from '../../store/DataRequestStore';

import fetchData from '../../utils/fetchData';

import { AddMoreBtn, ComponentDate, ComponentSearch, WorkerItem, NoteBody, ObjectSelect } from '../../components';

import useDateStore from '../../store/CalendarStore';

import { format } from 'date-fns';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const Object = () => {
  const currentDate = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  currentDate.setHours(0, 0, 0, 0);
  const { dates } = useDateStore();

  // Генерация днеЙ
  const [days, setDays] = useState([]);
  const [daysFullDate, setDaysFullDate] = useState([]);

  const { id } = useParams();

  // Инициализация дней
  useEffect(() => {
    if (dates.length > 0) {
      const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());
      setDays(sortedDates.map(date => date.getDate()));
      setDaysFullDate(sortedDates.map(date => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
      }));
    } else {
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const numDays = daysInMonth(currentMonth, currentYear);
      setDays(Array.from({ length: numDays }, (_, i) => i + 1));
      setDaysFullDate(Array.from({ length: numDays }, (_, i) => {
        const day = String(i + 1).padStart(2, '0');
        const month = String(currentMonth).padStart(2, '0');
        return `${day}.${month}.${currentYear}`;
      }));
    }
  }, [dates]);

  // Пагинация
  const daysPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(days.length / daysPerPage);

  const startIndex = (currentPage - 1) * daysPerPage;
  const endIndex = startIndex + daysPerPage;

  // Вычисляем displayedDays при каждом изменении days или currentPage
  const displayedDays = useMemo(() => {
    const start = (currentPage - 1) * daysPerPage;
    const end = start + daysPerPage;
    return days.slice(start, end);
  }, [days, currentPage]); // Добавляем days в зависимости

  // Автоскролл к текущей дате при монтировании
  useEffect(() => {
    if (dates.length === 0) {
      const currentDay = currentDate.getDate();
      const initialPage = Math.ceil(currentDay / daysPerPage);
      setCurrentPage(initialPage);
    }
  }, []);

  // Обработчики пагинации
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(p => p + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(p => p - 1);
    }
  };

  const [workers, setWorkers] = useState([]);
  const [popupActive, setPopupActive] = useState(false);

  let description = {};
  let path;
  switch (id) {
    case '12': {
      path = `?filters[id][$eq]=${id}&populate[techicas][populate][DayDataDetails][populate][DayInfo][populate]&populate[techicas][populate][DayDataDetails][populate][NightInfo][populate]=*`;

      description = {
        popupTitle: "Техника",
        addButtonText: "Добавить технику",
        pageTitle: "Техника"
      };

      break;
    }
    case '10': {
      path = `?filters[id][$eq]=${id}&populate[drobilkas][populate][DayDataDetails][populate][DayInfo][populate][SmenaDetails]=*&populate[drobilkas][populate][DayDataDetails][populate][NightInfo][populate][SmenaDetails]=*&populate[workers][populate][DayDataOstatki]=*&populate[drobilkas][populate][MonthDataTonnaj]=*`;

      description = {
        popupTitle: "Дробилка",
        addButtonText: "Добавить дробилку",
        pageTitle: "Дробилка"
      };
      break;
    }
    default: {
      /**
       * TODO: тут доработать получение остальных "объектов"
       */
      path = `?filters[id][$eq]=${id}&populate[workers][populate][DayDataDetails][populate][DayInfo][populate][SmenaDetails]=*&populate[workers][populate][DayDataDetails][populate][NightInfo][populate][SmenaDetails]=*&populate[workers][populate][DayDataOstatki]=*&populate[workers][populate][MonthDataTonnaj]=*`;

      description = {
        popupTitle: "Сотрудник",
        addButtonText: "Добавить сотрудника",
        pageTitle: "ФИО/должность"
      };
    }
  }

  // useEffect(() => {
  //   const fetchAndSetData = async () => {
  //     try {
  //       const data = await fetchData(`http://89.104.67.119:1337/api/objects${path}`);
  //       if (id == '12') {
  //         setWorkers(data[0].techicas);
  //       } else if (id == '10') {
  //         setWorkers(data[0].drobilkas);
  //       } else {
  //         setWorkers(data[0].workers);
  //       }
  //     } catch (error) {
  //       console.error("Ошибка при получении данных:", error);
  //     }
  //   };

  //   fetchAndSetData();
  // }, [dates, currentPage, id]);

  // ======================================================================
  const { data: storeDate, clearData } = useDataRequestStore();
  // console.log('storeDate ', storeDate);
  // console.log('workers ', workers);

  // Эффект для загрузки данных
  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        if (storeDate && !Array.isArray(storeDate)) {
          setWorkers([storeDate]);
          return;
        }

        const data = await fetchData(`http://89.104.67.119:1337/api/objects${path}`);
        let workersData = [];

        if (id == '12') {
          workersData = data[0].techicas;
        } else if (id == '10') {
          workersData = data[0].drobilkas;
        } else {
          workersData = data[0].workers;
        }

        setWorkers(workersData);

      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchAndSetData();
  }, [dates, currentPage, id, storeDate]);
  // // ======================================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [dates]);

  const [months, setMonths] = useState([]);

  useEffect(() => {
    if (dates.length > 0) {
      const newMonths = dates.map((date, idx) => ({
        id: idx, month: format(date, 'LLL', { locale: ru })
      }));

      setMonths(newMonths);
    }
  }, [dates]);

  /**
   *
   * TODO:
   * сейчас при загрузке страницы грузится текущий месяц и первые 5 дней от начала месяца (допустимо)
   * Нужно во-первых сделать так чтобы грузилась текущая дата
   * Во-вторых, нужно подумать, как ставить название месяца, при выборе конкретного дня (Или он не будет меняться и просто менять текст ?)
   * В третьих, при добавлении дней в dates должны отображаться дни (выбранные) с правильным месяцем (сейчас это работает но только до 5 дней, после - начинается повторение, что неверно)
   *
   */

  return (
    <section className={styles.main_section}>
      <div className="container">
        <div className={`${styles.header_wrapper} sticky-header`}>
          <header className={styles.top}>
            <ObjectSelect setWorkers={setWorkers} />
            <div className={styles.top_wrapper}>
              <ComponentSearch />
              <ComponentDate />
            </div>
          </header>
          <div className={styles.table}>
            <div className={styles.table_header}>
              <ul className={`${styles.day_list} ${styles.wrapper_day}`}>
                <li className={styles.title_table}>{description.pageTitle}</li>
                {displayedDays.map((day, idx) => {
                  const currentMonth = months.length > 0
                    ? months[idx].month
                    : format(new Date(), 'LLL', { locale: ru }
                    );

                  return (
                    <li className={styles.item_table} key={idx}>
                      {/* ТИПО ВРЕМЕННОЕ РЕШЕНИЕ (НЕТ) */}
                      <div>
                        {day} {currentMonth}

                      </div>
                    </li>
                  )
                }
                )}
              </ul>
              <div className={styles.pagination}>
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={styles.button}
                >
                  <img style={{ rotate: '-180deg' }} src='/next.svg' alt='previous' />
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={styles.button}
                >
                  <img src='/next.svg' alt='next' />
                </button>
              </div>

              <ul className={`${styles.day_list} ${styles.wrapper_time}`}>
                <li className={styles.title_table}></li>
                {displayedDays.map((day, idx) => (
                  <li className={styles.item_table} key={idx}>
                    <div className={styles.time_item}>
                      <img src='/sun.svg' alt='День' />
                      <p style={{ color: '#F2B174' }}>День</p> |
                      <img src='/moon.svg' alt='Ночь' />
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
            handleClick={() => setPopupActive(worker.id)}
            active={popupActive === worker.id}
            setActive={setPopupActive}
            title={description.popupTitle}
          />
        ))}

        <div className={styles.add_workers}>
          <AddMoreBtn
            onHandleClick={() => setWorkers([...workers, { id: workers.length + 1, name: '' }])}
            title={description.addButtonText}
          />
        </div>
      </div>

    </section>
  );
};

export default Object;