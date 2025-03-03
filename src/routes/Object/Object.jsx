import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.scss';

import { 
    AddMoreBtn, 
    ComponentDate, 
    ComponentSearch, 
    AddPopupContent, 
    CheckNoteBtn, 
  NoteBody
}
  from '../../components';

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

  const [popupActive, setPopupActive] = useState(false);
  const [noteBodyActive, setNoteBodyActive] = useState(false);
  

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

  const handleClick = () => {
    setPopupActive(true);
  };

  const handleClickNote = () => {
    setNoteBodyActive(true);
  }

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
                  {/* <p className={styles.title_table}>ФИО/должность</p> */}

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
                  <div className={styles.time_item}><img src='/moon.svg' alt='' /><p style={{ color: '#1F2433sun'}}>Ночь</p> | <img src='/sun.svg' alt='' /><p style={{ color: '#F2B174'}}>День</p></div> 
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.workers_list}>
          {workers.map((worker) => (
            <div key={worker.id} className={styles.workers_item_wrapper}>
              <div className={styles.workers_item} > 
                <div className={styles.worker_data}>
                  <p>{worker.name}</p>
                  <p>Тоннаж</p>
                </div>

                {displayedDays.map((day) => (
                  <div className={styles.item_table} key={day}>
                    <div className={styles.item_data}>
                      <div className={styles.detail}> 
                        <p>
                          Тоннаж 
                        </p>

                        <p>
                          500,25
                        </p>
                      </div>

                      <div className={styles.detail}>
                        <p>
                          ТС 
                        </p>

                        <p>
                          УСМ-20
                        </p>
                      </div>

                      <CheckNoteBtn handleClick={handleClickNote} />
                    </div>
                    <div className='border_top_gray'>

                    </div>
                    <div className={styles.item_data}>
                      <div className={styles.detail}> 
                        <p>
                          не работал
                        </p>
                      </div>
  
                      <CheckNoteBtn handleClick={handleClickNote} />

                    </div>

                  </div>
                ))}

                <a
                  href="#popup"
                  className={styles.edit} 
                  onClick={handleClick}
                >
                  <img src='/edit.svg' alt='' /> 
                </a>
              </div>

              <div className={styles.sum}>
                <div className={styles.sum_wrapper}>
                  <p className={styles.sum_text}>Всего</p>
                  <p className={styles.sum_month}>Месяц</p>
                </div>

                <div className={styles.sum_detail}>
                  <p>Дневные смены</p>
                  <p>9</p>
                </div>

                <div className={styles.sum_detail}>
                  <p>Ночные смены</p>
                  <p>9</p>
                </div>


                <div className={styles.sum_detail}>
                  <p>Всего смен</p>
                  <p>19</p>
                </div>


                <div className={styles.sum_detail}>
                  <p>Общий тоннаж</p>
                  <p>9000,89</p>
                </div>

                <div className={styles.sum_detail}>
                  <p>Выставили</p>
                  <p>9000,89</p>
                </div>

                <div className={styles.sum_detail}>
                    <p>Выставили</p>
                    <p>
                      10 000,89
                    </p>
                </div>

                <div className={styles.sum_detail}>
                  <p>Ост. Порт</p>
                  <p>1000,89</p>
                </div>

                <div className={styles.sum_detail}>
                  <p>Ост. ГиР</p>
                  <p>1500,89</p>
                </div>
              </div>  
            </div>
            
          ))}
        </div>

        <div className={styles.add_workers}>
          <AddMoreBtn 
            onHandleClick={handleAddWorker} 
            title={'Добавить сотрудника'}
          />
        </div>
      </div>

      <AddPopupContent 
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

