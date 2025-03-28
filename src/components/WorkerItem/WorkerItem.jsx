import React from 'react'
import styles from './style.module.scss';
import { AddPopupContent } from '../../components';

import { CheckNoteBtn, NoteBody } from '../../components';

import { motion } from 'motion/react';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';


/**
 * 
 * TODO:
 * сделать проверки типов данных, наличие данных (не пустыеЮ возможно, стоит сделать JSON.parse()); 
 * 
 */

const EmptyWorkerItemData = ({ handleClickNote }) => {
  return (
    <>
      <div className={`${styles.worker_item_empty} ${styles.empty}`}>
        <div className={styles.item_table}>
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

const WorkerDetails = ({
  id,
  worker,
  displayedDays,
  handleClick,
  handleClickNote,
  allDates,
  missingDates,
  setNoteBodyActive,
  noteBodyActive
}) => {

  console.log(worker);
  // Преобразуем missingDates в Set чисел для быстрого поиска
  const missingDatesSet = new Set(missingDates.map(item => parseInt(item.split('.')[0], 10)))

  // Мемоизация рендера смены
  const renderShift = (shift, type) => {
    if (!shift) return <p className="notWorking"></p>

    const status = shift.SmenaDetails?.SmenaStatusWorker;

    const statusMap = {
      null: null,
      'Not working': { text: 'Не работал', className: 'notWorking' },
      'Day Off': { text: 'Выходной', className: 'dayOf' },
      'Empty': { text: '', className: '' }
    }

    if (statusMap[status]) {
      return <p className={statusMap[status].className}>{statusMap[status].text}</p>
    }

    return (
      <>
        <p>Дата: {shift.SmenaDetails?.SmenaDateDetails}</p>
        <p className={styles.details_static}>Тоннаж</p>
        <p className={`${styles.details_nostatic} working`}>
          {shift.SmenaDetails?.SmenaDataTonnaj || "Данные отсутствуют"}
        </p>
        <p>Дата: {shift.SmenaDetails?.SmenaDateDetails}</p>
        <p className={styles.details_static}>ТС</p>
        <p className={`${styles.details_nostatic} working`}>
          {shift?.SmenaDetails?.TC || "Данные отсутствуют"}
        </p>

        <NoteBody
          active={noteBodyActive}
          setActive={setNoteBodyActive}
          data={worker}
          date={shift.SmenaDetails?.SmenaDateDetails}
        />
      </>
    )
  }
  
  /** 
   * 
   * TODO: НАШЕЛ БАГУ
   * ДЕло в том, что при загрузке первых 5 дней, происходит ошибка, допустим есть с 1 по 5 число, потом с 6 числа не работает логика
   * При добавлении из админки 10 числа и последующих - не отображаются сотрудники
   */


   /** 
   * 
   * TODO: НАШЕЛ БАГУ
   * При создании человека, надо наверно отправлять правильную дату формата 3.03.2025, а не 03.03.2025
   * 
   */

  // Рендер одной даты
  const renderDate = (date) => {
    const isMissing = missingDatesSet.has(date)
    if (isMissing) return <EmptyWorkerItemData key={date} />

    const dayData = worker?.DayDataDetails?.find(d =>
      parseInt(d?.DayInfo?.SmenaDetails?.SmenaDateDetails?.split('.')[0], 10) === date
    )

    return (
      <div className={styles.item_table} key={date}>
        {/* Дневная смена */}
        <div className={styles.item_data}>
          <div className={styles.detail}>
            {renderShift(dayData?.DayInfo, 'day')}
          </div>
          <CheckNoteBtn handleClick={handleClickNote} />
        </div>

        <div className='border_top_gray'></div>

        {/* Ночная смена */}
        <div className={styles.item_data}>
          <div className={styles.detail}>
            {renderShift(dayData?.NightInfo, 'night')}
          </div>
          <CheckNoteBtn handleClick={handleClickNote} />
        </div>
      </div>
    )
  }

  console.log('worker !!!!!', worker);

  /**
   * 
   * TODO: 
   * тут бут логика подсчета всех данных за месяц или за период
   * 
   */
  // сумма дневных смен, когда он работал (уточнить у заказчика)
  const totalAmountDaySmena     =   worker?.DayDataDetails?.length;

  // сумма ночных смен, когда он работал (уточнить у заказчика)
  const totalAmountNightSmena   =   worker?.DayDataDetails?.length;

  // сумма смен всего, сколько работал
  const totalAmountSmena        =   totalAmountDaySmena + totalAmountNightSmena;

  // сумма тоннажа, сколько он выработала за месяц или период
  const totalSumTonnaj          =   'SmenaDataTonnaj * ';

  // число планое, сколько ему надо было выработать (на каждый месяц оно свое)
  const totalSumTonnajPlan      =   worker?.MonthDataTonnaj[0]?.AmountData;

  // сумма тон осталась выработать в ГИР на конец месяца??? сумма выставии - тон смены
  const totalSumOstatokGir      =   worker?.DayDataOstatki[0]?.DayDataOstatkiGIR;

  // сумма тон осталась выработать в ПОРТ на конец месяца??? сумма выставии - тон смены
  const totalSumOstatokPort     =   worker?.DayDataOstatki[0]?.DayDataOstatkiPORT;
  
  // const totalAmountDaySmena     =   ''
  // const totalAmountNightSmena   =   ''
  // const totalAmountSmena        =   ''
  // const totalSumTonnaj          =   ''
  // const totalSumTonnajPlan      =   ''
  // const totalSumOstatokGir      =   ''
  // const totalSumOstatokPort     =   ''


  return (
    <>
      <div className={styles.workers_item} id={id}>
        <div className={styles.worker_data}>
          <div>
            <p style={{ fontWeight: '700' }}>{worker?.Name || "Данные отсутствуют"}</p>
            <p>{worker?.Job || "Данные отсутствуют"}</p>
          </div>
          <p>Тоннаж</p>
        </div>

        {displayedDays.map(renderDate)}

        {console.log(worker)}

        <a href="#popup" className={styles.edit} onClick={handleClick}>
          <img src='/edit.svg' alt='' />
        </a>
      </div>

      <div className={styles.sum}>
        <div className={styles.sum_wrapper}>
          <p className={styles.sum_text}>Всего</p>
          <p className={styles.sum_month}>{format(new Date, 'LLLL', { locale: ru})}</p>
        </div>

        {[
          { label: 'Дневные смены',   value:  totalAmountDaySmena   },
          { label: 'Ночные смены',    value:  totalAmountNightSmena },
          { label: 'Всего смен',      value:  totalAmountSmena      },
          { label: 'Общий тоннаж',    value:  totalSumTonnaj        },
          { label: 'Выставили',       value:  totalSumTonnajPlan    },
          { label: 'Ост. Порт',       value:  totalSumOstatokGir    },
          { label: 'Ост. ГиР',        value:  totalSumOstatokPort   },
        ].map((item, index) => (
          <div className={styles.sum_detail} key={item.label}>
            <p>{item.label}</p>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default function WorkerItem({
  daysFullDate,
  active,
  setActive,
  title,
  id,
  setWorkers,
  workers,
  worker,
  displayedDays,
  handleClick,
  handleClickNote,
  noteBodyActive,
  setNoteBodyActive


}) {

  console.log(worker);

  // Все даты месяца
  const allDates = daysFullDate;
  // console.log('allDates (дни всего месяца)', allDates);

  // Даты из worker.DayDataDetails
  const workerDates = worker?.DayDataDetails?.map((item) => item?.DayInfo?.SmenaDetails?.SmenaDateDetails)?.filter((date) => date !== undefined); 
  // console.log('workerDates (дни, которые отмечены в админки любым статусом)', workerDates);

  // Даты, которые есть в workerDates, но отсутствуют в allDates
  const missingDates = allDates?.filter(
    (date) => !workerDates?.includes(date)
  );
  
  // console.log('missingDates (по идее, дни для которых будет пустой шаблон т.е. те, которых нет в workerDates)', missingDates);


  const isWorkerEmpty = worker.name === '';
  return (
    <>
      {workers.length > 0 && worker && (
        <motion.div
          id={worker.uuid}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          key={worker.uuid}
          className={`${styles.workers_item_wrapper} ${isWorkerEmpty ? styles.workers_item_wrapper_empty : ''}`}
        >
          {isWorkerEmpty ? (
            <EmptyWorkerItem id={worker.uuid ? worker.uuid : worker.id} worker={worker} displayedDays={displayedDays} handleClickNote={handleClickNote} handleClick={handleClick} />
          ) : (
            <WorkerDetails id={worker.uuid ? worker.uuid : worker.id}  noteBodyActive = {noteBodyActive} setNoteBodyActive = {setNoteBodyActive}
            missingDates={missingDates} allDates={allDates} worker={worker} displayedDays={displayedDays} handleClickNote={handleClickNote} handleClick={handleClick} />
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