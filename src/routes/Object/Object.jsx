import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import fetchData from '../../utils/fetchData';
import styles from './style.module.scss';
import { AddMoreBtn, ComponentDate, ComponentSearch, WorkerItem, NoteBody, ObjectSelect } from '../../components';
import useDateStore from '../../store/CalendarStore';

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const Object = () => {
  const currentDate = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
   }, []);
  
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
        return `${day}.${month}.${date.getFullYear()}`;
      }));
    } else {
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const numDays = daysInMonth(currentMonth, currentYear);
      const generatedDays = Array.from({ length: numDays }, (_, i) => i + 1);
      const generatedFullDates = generatedDays.map(day => 
        `${String(day).padStart(2, '0')}.${String(currentMonth).padStart(2, '0')}.${currentYear}`
      );
      setDays(generatedDays);
      setDaysFullDate(generatedFullDates);
    }
  }, [dates, currentDate]);

  // Пагинация
  const daysPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(() => Math.ceil(days.length / daysPerPage), [days]);

  const startIndex = (currentPage - 1) * daysPerPage;
  const endIndex = startIndex + daysPerPage;

   // Вычисляем displayedDays при каждом изменении days или currentPage

  const displayedDays = useMemo(() => {
    if (dates.length > 0) {
      const start = (currentPage - 1) * daysPerPage;
      return days.slice(start, start + daysPerPage);
    }
    
    // Дефолтное отображение: текущий день и следующие 4 дня
    const currentDay = currentDate.getDate();
    const startIndex = Math.max(0, currentDay - 1); // -1 потому что индексы с 0
    const endIndex = startIndex + daysPerPage;
    return days.slice(startIndex, endIndex);
  }, [days, currentPage, dates, currentDate]);


  useEffect(() => {
    if (dates.length === 0) {
      const currentDay = currentDate.getDate();
      const startIndex = Math.floor((currentDay - 1) / daysPerPage);
      setCurrentPage(startIndex + 1);
    }
  }, [dates, currentDate]);

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
  const [noteBodyActive, setNoteBodyActive] = useState(false);

  // Формирование URL
  // const dateFilters = daysFullDate
  //   .slice(startIndex, endIndex)
  //   .map((date, index) => `?filters[id][$eq]=${id}&filters[DayDataDetails][DayInfo][SmenaDetails][SmenaDateDetails][$in][${index}]=${date}`)
  //   .join('&');

  // const populateParams = `populate[DayDataDetails][populate][DayInfo][populate]=*&populate[DayDataDetails][populate][NightInfo][populate]=*&populate[MonthDataTonnaj][populate]=*&populate[DayDataOstatki][populate]=*`;
  // const apiUrl = `http://89.104.67.119:1337/api/people?filters[Objects][id][$eq]=${id}${dateFilters}&${populateParams}`;

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const data = await fetchData(`http://89.104.67.119:1337/api/objects?filters[id][$eq]=${id}&populate[workers][populate][DayDataDetails][populate][DayInfo][populate][SmenaDetails]=*&populate[workers][populate][DayDataDetails][populate][NightInfo][populate][SmenaDetails]=*`);
        console.log(data)
        setWorkers(data[0].workers);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchAndSetData();

  }, [dates, currentPage, id]);
  

  useEffect(() => {
    setCurrentPage(1);
  }, [dates]);

  console.log(displayedDays)

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
                    <div>{day}</div>
                  </li>
                ))}

                <div className={styles.pagination}>
                  <button 
                    onClick={handlePrevious} 
                    disabled={currentPage === 1}
                  >
                    <img style={{ rotate: '-180deg' }} src='/next.svg' alt='previous' />
                  </button>

                  <button 
                    onClick={handleNext} 
                    disabled={currentPage === totalPages}
                  >
                    <img src='/next.svg' alt='next' />
                  </button>
                </div>
              </ul>

              <ul className={`${styles.day_list} ${styles.wrapper_time}`}>
                <p className={styles.title_table}></p>
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
            daysFullDate={daysFullDate.slice(startIndex, endIndex)}
            displayedDays={displayedDays}
            handleClick={() => setPopupActive(true)}
            handleClickNote={() => setNoteBodyActive(true)}
            active={popupActive}
            setActive={setPopupActive}
            title={'Сотрудник'}
          />
        ))}

        <div className={styles.add_workers}>
          <AddMoreBtn
            onHandleClick={() => setWorkers([...workers, { id: workers.length + 1, name: '' }])}
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