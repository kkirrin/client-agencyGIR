import React from 'react';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';

export default function MainComponent({ data }) {
  const domain = 'http://89.104.67.119:1337';

  return (
    <section className={styles.main_section}>
      <div className='container'>
        <h2 className={styles.title}>
          Выберите объект
        </h2>

        <ul className={styles.list}>
          {data?.map((item, idx) => {
            return (
              <li className={styles.item} key={idx}>
                <Link to={`/object/${item.id}`} className={styles.item_link} state={{ data }}>
                  <img src={`${domain}${item.image.url}`}
                    alt={item.Name || 'Изображение объекта'}
                    className={styles.item_img}
                    width={250}
                    height={200}
                  />
                  <p className={styles.item_title}>
                    {item.Name ? item.Name : 'Ошибка получения заголовка'}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

