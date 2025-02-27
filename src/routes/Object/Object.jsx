import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.scss';
import { AddWorkerBtn, ComponentDate, ComponentSearch } from '../../components';

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const Object = () => {
  const { id } = useParams();
  const object = { id: 1, name: 'АО "Находкинский морской торговый порт" (УТ-1)' };
  const numDays = daysInMonth(2, 2025); 
  const days = Array.from({ length: numDays }, (_, i) => i + 1);
  const daysPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * daysPerPage;
  const endIndex = Math.min(startIndex + daysPerPage, days.length);
  const displayedDays = days.slice(startIndex, endIndex);

  const [ workers, setWorkers ] = useState([]);

  const handleAddWorker = () => {
    setWorkers([...workers, { id: workers.length + 1, name: 'Test'}]);
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

  return (
    <section className={styles.main_section}>
      <div className="container">
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
              {displayedDays.map((day) => (
                <li className={styles.item_table} key={day}>
                  <div>{day}</div>
                </li>
              ))}

              <div className={styles.pagination}> 
                <button onClick={handlePrevious} disabled={currentPage === 0}>
                  <img style={{ rotate: '-180deg'}} src='/next.svg' alt='next' />
                </button>
                
                <button onClick={handleNext} disabled={endIndex >= days.length}>
                    <img src='/next.svg' alt='next' />
                </button>
              </div>
            </ul>

            <ul className={`${styles.day_list} ${styles.wrapper_time}`}>

              {displayedDays.map((day) => (
                <li className={styles.item_table} key={day}>
                  <div className={styles.time_item}><img src='/sun.svg' alt='' /><p style={{ color: '#F2B174'}}>День</p> | <img src='/moon.svg' alt='' /><p style={{ color: '#1F2433sun'}}>Ночь</p></div> 
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.workers_list}>
          {workers.map((worker) => (
            <div key={worker.id}> 
              <p>{worker.name}</p>
              <button onClick={() => {}}>
                <img src='/edit.svg' alt='' /> 
              </button>
            </div>
          ))}
        </div>

        <div className={styles.add_workers}>
          <AddWorkerBtn onAddWorker={handleAddWorker} />
        </div>
      </div>
    </section>
  );
};

export default Object;

