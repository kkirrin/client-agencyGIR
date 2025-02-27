import React from 'react';
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
            <p>ФИО/должность</p>
            {days.map((day) => (
              <p key={day}>{day}</p>
            ))}
          </div>
        </div>
        <div className={styles.add_workers}>
          <AddWorkerBtn />
        </div>
      </div>
    </section>
  );
};

export default Object;


