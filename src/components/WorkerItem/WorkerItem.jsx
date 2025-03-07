import React from 'react'
import styles from './style.module.scss';

import { CheckNoteBtn,  } from '../../components';

import { motion } from 'motion/react';

export default function WorkerItem({ setWorkers, workers, worker, displayedDays, handleClick, handleClickNote }) {
  return (
    <div
        key={worker} value={worker}
        axis="y"
    >
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }} key={worker.id}
        className={styles.workers_item_wrapper}
    >
        <div className={styles.workers_item}> 
        <div className={styles.worker_data}>
            <p>{worker.name}</p>
            <p>Тоннаж</p>
        </div>

        {displayedDays.map((day) => (
            <div className={styles.item_table} key={day}>
            <div className={styles.item_data}>
                <div className={styles.detail}> 
                <p>Тоннаж</p>
                <p>500,25</p>
                </div>

                <div className={styles.detail}>
                <p>ТС</p>
                <p>УСМ-20</p>
                </div>

                <CheckNoteBtn handleClick={handleClickNote} />
            </div>
            <div className='border_top_gray'></div>
            <div className={styles.item_data}>
                <div className={styles.detail}> 
                <p>не работал</p>
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
                <p>10 000,89</p>
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
    </motion.div>
  </div>

  )
}

