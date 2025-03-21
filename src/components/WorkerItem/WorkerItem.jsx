import React from 'react'
import styles from './style.module.scss';
import { AddPopupContent } from '../../components';

import { CheckNoteBtn,  } from '../../components';

import { motion } from 'motion/react';


/**
 * 
 * TODO:
 * сделать проверки типов данных, наличие данных (не пустыеЮ возможно, стоит сделать JSON.parse()); 
 * 
 */

const EmptyWorkerItemData = ({ handleClickNote, handleClick }) => {
  return (
    <>
      <div className={`${styles.workers_item} ${styles.empty}`}>
        <div className={styles.item_table} key={day}>
          <div className={styles.item_data}>
            <div className={styles.detail}></div>
            <div className={styles.detail}></div>
            <CheckNoteBtn handleClick={handleClickNote} />
          </div>
          <div className='border_top_gray'></div>
          <div className={styles.item_data}>
            <div className={styles.detail}>
            </div>
            <CheckNoteBtn handleClick={handleClickNote} />
          </div>
        </div>
      </div>
    </>   
  )
}

    


const EmptyWorkerItem = ({ worker, displayedDays, handleClickNote, handleClick }) => (
    <div className={`${styles.workers_item} ${styles.empty}`}>
      <div className={styles.worker_data}>
        <p>{worker.name}</p>
      </div>
  
      {displayedDays.map((day) => (
        <div className={styles.item_table} key={day}>
          <div className={styles.item_data}>
            <div className={styles.detail}></div>
            <div className={styles.detail}></div>
            <CheckNoteBtn handleClick={handleClickNote} />
          </div>
          <div className='border_top_gray'></div>
          <div className={styles.item_data}>
            <div className={styles.detail}>
            </div>
            <CheckNoteBtn handleClick={handleClickNote} />
          </div>
        </div>
      ))}
  
      <a href="#popup" className={styles.edit} onClick={handleClick}>
        <img src='/edit.svg' alt='' />
      </a>
    </div>
);


const WorkerDetails = ({ worker, displayedDays, handleClick, handleClickNote }) => {
  console.log(worker)
  return (
      <>
        <div className={styles.workers_item}>
          <div className={styles.worker_data}>
            <div>
              <p style={{ fontWeight: '700' }}>{worker?.Name || "Данные отсутствуют"}</p>
              <p>{worker?.Job || "Данные отсутствуют"}</p>
            </div>
        
            <p>Тоннаж</p>
          </div>
          
          {displayedDays.forEach((item, index) => {
            /**
             * тут проверки на тип данных, потом проверяется статус работника
             * присвоение нужной строки,
             * если item будет пустой, то будет шаблон пустой отображаться  
             */
            typeof (worker?.DayDataDetails !== undefined) && worker?.DayDataDetails.map((day) => {
              let status = '';
              let statusClassName = '';
              switch (worker?.DayDataDetails[0]?.DayInfo?.SmenaDetails?.SmenaStatusWorker) {

                case 'Default':
                  status = '';
                  statusClassName = ''
                  break;

                case 'Not working':
                  status = 'Не работал';
                  statusClassName = 'notWorking';
                  break;

                case 'Day Off':
                  status = 'Выходной';
                  statusClassName = 'dayOf';
                  break;

                case 'Empty':
                  status = '';
                  statusClassName = '';
                  break;
              }
              
              return (
                    <div className={styles.item_table} key={day}>
                          <div className={styles.item_data}>
                              {/* {worker?.DayDataDetails.DayInfo?.Day === true && worker?.DayDataDetails.NightInfo?.Night === true ? (
                                <p>
                                  
                                </p>
                              )
                                :
                              (
                              <p>
                                  
                              </p>
                              )} */}

                            {/* /
                              ДНЕВНАЯ СМЕНА
                            */}
                            
                                <div className={styles.detail}>
                                  {console.log('worker', worker?.DayDataDetails.length, displayedDays.length)};
                                  {worker?.DayDataDetails[0]?.DayInfo?.Day === true ? (
                                    ["Not working", "Empty", "Day Off"].includes(worker?.DayDataDetails[0]?.DayInfo?.SmenaDetails?.SmenaStatusWorker) ? (
                                      <p className={`${statusClassName}`}>{status}</p>
                                    ) : (
                                      <>
                                        <p className={styles.details_static}>Тоннаж</p>
                                        <p className={`${styles.details_nostatic} working`}>
                                          {worker?.DayDataDetails[0]?.DayInfo?.SmenaDetails?.SmenaDataTonnaj || "Данные отсутствуют"}
                                        </p>
            
                                        <p className={styles.details_static}>ТС</p>
                                        <p className={`${styles.details_nostatic} working`}>
                                          {worker?.DayDataDetails[0]?.DayInfo?.SmenaDetails?.TC || "Данные отсутствуют"}
                                        </p>
                                      </>
                                    )
                                  ) : (
                                    ''
                                  )}
                                </div>

                                {["Not working", "Empty", "Day Off"].includes(worker?.DayDataDetails[0]?.NightInfo?.SmenaDetails?.SmenaStatusWorker) ? (
                                  <p className="notWorking">{worker?.DayDataDetails[0]?.NightInfo?.SmenaDetails?.SmenaStatusWorker}</p>
                                ) : (
                                  <>
                                    <p className={styles.details_static}>Тоннаж</p>
                                    <p className={`${styles.details_nostatic} working`}>
                                      {worker?.DayDataDetails[0]?.NightInfo?.SmenaDetails?.SmenaDataTonnaj || "Данные отсутствуют"}
                                    </p>
                                  </>
                                )}
                              
                        
                              <div className={styles.detail}>
                                {worker?.DayDataDetails[0]?.DayInfo?.Day === true ? (
                                  <>
                                    <p className={styles.details_static}>Тоннаж</p>
                                    <p className={`${styles.details_nostatic} working`}>{worker?.DayDataDetails[0]?.DayInfo?.SmenaDetails?.SmenaDataTonnaj || "Данные отсутствуют"}</p>
                                  </>
                                  ) : (
                                    <p className='notWorking'>{worker?.DayDataDetails[0]?.DayInfo?.SmenaDetails?.SmenaStatusWorker || "-"}</p>
                                  )}
                              </div>
            
                              <div className={styles.detail}>
                                {worker?.DayDataDetails[0]?.DayInfo?.Day === true ? (
                                  <>
                                    <p className={styles.details_static}>ТС</p>
                                    <p className={`${styles.details_nostatic} working`}>{worker?.DayDataDetails[0]?.DayInfo?.SmenaDetails?.TC || "Данные отсутствуют"}</p>
                                  </>
                                ) : (
                                    <p className='notWorking'>{worker?.DayDataDetails[0]?.DayInfo?.SmenaDetails?.SmenaStatusWorker || "-"}</p>
                                )}
                              </div> 
            
                              <CheckNoteBtn handleClick={handleClickNote} />
                          </div>
                    
                          <div className='border_top_gray'></div>

                          {/* 
                            НОЧНАЯ СМЕНА
                          */}
                          <div className={styles.item_data}>
                            <div className={styles.detail}>
                                {worker?.DayDataDetails[0]?.NightInfo?.Night === true ? (
                                  <>
                                    <p className={styles.details_static}>Тоннаж</p>
                                    <p className={`${styles.details_nostatic} working`}>{worker?.DayDataDetails[0]?.NightInfo?.SmenaDetails?.SmenaDataTonnaj || "Данные отсутствуют"}</p>
                                  </>
                                  ) : (
                                    <p className="notWorking">{worker?.DayDataDetails[0]?.NightInfo?.SmenaStatusWorker || "-"}</p>
                                  )}
                              </div>
            
                              <div className={styles.detail}>
                                {worker?.DayDataDetails[0]?.NightInfo?.Night === true ? (
                                  <>
                                    <p className={styles.details_static}>ТС</p>
                                    <p className={`${styles.details_nostatic} working`}>{worker?.DayDataDetails[0]?.NightInfo?.SmenaDetails?.TC || "Данные отсутствуют"}</p>
                                  </>
                                ) : (
                                  <p className="notWorking">{worker?.DayDataDetails[0]?.NightInfo?.SmenaStatusWorker || "-"}</p>
                                )}
                              </div>
            
                              <CheckNoteBtn handleClick={handleClickNote} />
                          </div>
                    </div>
              )}) 
            })
          }
      
          <a href="#popup" className={styles.edit} onClick={handleClick}>
                <img src='/edit.svg' alt='' />
          </a>
        </div>

        <div className={styles.sum}>
          <div className={styles.sum_wrapper}>
              <p className={styles.sum_text}>Всего</p>
              <p className={styles.sum_month}>Месяц</p>
          </div>

          {[
              { label: 'Дневные смены', value: '' },
              { label: 'Ночные смены', value: '' },
              { label: 'Всего смен', value: '' },
              { label: 'Общий тоннаж', value: '' },
              { label: 'Выставили', value: '' },
              { label: 'Выставили', value: '' },
              { label: 'Ост. Порт', value: '' },
              { label: 'Ост. ГиР', value: '' },
          ].map((item, index) => (
              <div className={styles.sum_detail} key={index}>
              <p>{item.label}</p>
              <p>{item.value}</p>
              </div>
          ))}
        </div>
      </>
  )
}

  

export default function WorkerItem({
  daysFullDate={daysFullDate},
  active,
  setActive,          
  title,
  id,
  setWorkers,
  workers,
  worker,
  displayedDays,
  handleClick,
  handleClickNote
    
  }) {
  
  // Все даты месяца
  const allDates = daysFullDate;

  // Даты из worker.DayDataDetails
  const workerDates = worker?.DayDataDetails?.map((item) => item?.DayInfo?.SmenaDetails?.SmenaDateDetails)?.filter((date) => date !== undefined); 

  // Даты, которые есть в workerDates, но отсутствуют в allDates
  const missingDates = allDates?.filter(
    (date) => !workerDates.includes(date)
  );

  console.log('Все даты месяца:', allDates);
  console.log('Даты из worker.DayDataDetails:', workerDates);
  console.log('Отсутствующие даты:', missingDates);

  const isWorkerEmpty = worker.name === '';

  return (
    <>
        {
            workers.length > 0 && worker && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    key={worker.id}
                    className={`${styles.workers_item_wrapper} ${isWorkerEmpty ? styles.workers_item_wrapper_empty : ''}`}
                >
                   {isWorkerEmpty ? (
                    <EmptyWorkerItem worker={worker} displayedDays={displayedDays} handleClickNote={handleClickNote} handleClick={handleClick} />
                ) : (
                    <WorkerDetails worker={worker} displayedDays={displayedDays} handleClickNote={handleClickNote} handleClick={handleClick} />
                )}
                        
                </motion.div>
            )
      }
      
       <AddPopupContent
          id={id}
          active={active}
          setActive={setActive}
          title={title}
        />
    </>

  )
}

