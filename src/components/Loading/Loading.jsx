import React from 'react';
import styles from './style.module.scss';

const Loading = () => {
  return (
    <section className={styles.main_bg}>
      <div className={`${styles.wrapper} container`}>
        <div className={styles.info_text}>
            Отчеты
        </div>
        <h2 className={styles.title}>Морской порт</h2>
        <div className={styles.loader}></div>
      </div>
    </section>
  );
};

export default Loading;