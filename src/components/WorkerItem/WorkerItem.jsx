import React from 'react'
import styles from './style.module.scss';

import { CheckNoteBtn,  } from '../../components';

import { motion } from 'motion/react';


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
              <p></p>
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


const WorkerDetails = ({ worker, displayedDays, handleClick, handleClickNote}) => (
  
  <>

        <div className={styles.workers_item}>
        <div className={styles.worker_data}>
          <p>{worker.Name}</p>
          <p>{worker.Job}</p>
          <p>Тоннаж</p>
        </div>

        {displayedDays.map((day) => (
            <div className={styles.item_table} key={day}>
            <div className={styles.item_data}>
                <div className={styles.detail}>
                <p></p>
                <p></p>
                </div>

                <div className={styles.detail}>
                <p></p>
                <p></p>
                </div>

                <CheckNoteBtn handleClick={handleClickNote} />
            </div>
            <div className='border_top_gray'></div>
            <div className={styles.item_data}>
                <div className={styles.detail}>
                <p></p>
                </div>

                <CheckNoteBtn handleClick={handleClickNote} />
            </div>
            </div>
        ))}

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
            { label: 'Дневные смены', value: '9' },
            { label: 'Ночные смены', value: '9' },
            { label: 'Всего смен', value: '19' },
            { label: 'Общий тоннаж', value: '9000,89' },
            { label: 'Выставили', value: '9000,89' },
            { label: 'Выставили', value: '10 000,89' },
            { label: 'Ост. Порт', value: '1000,89' },
            { label: 'Ост. ГиР', value: '1500,89' },
        ].map((item, index) => (
            <div className={styles.sum_detail} key={index}>
            <p>{item.label}</p>
            <p>{item.value}</p>
            </div>
        ))}
        </div>
  </>
);

  

export default function WorkerItem({ setWorkers, workers, worker, displayedDays, handleClick, handleClickNote }) {
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
    </>

  )
}

