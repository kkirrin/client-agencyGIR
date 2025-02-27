import React, {useState, useEffect } from 'react';
import styles from './style.module.scss';

export default function AddWorkerBtn({ click }) {
  


  return (
    <button onClick={() => console.log('клик')} className={styles.btn}>
        <img src='/add.svg' alt='' />
        <p className={styles.btn_text}>Добавить сотрудника</p>
    </button>
  )
}

