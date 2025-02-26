import React from 'react';
import styles from './style.module.scss';

export default function AddWorkerBtn({ click }) {
  return (
    <button className={styles.btn}>
        <img src='/add.svg' alt='' />
        <p className={styles.btn_text}>Добавить сотрудника</p>
    </button>
  )
}

