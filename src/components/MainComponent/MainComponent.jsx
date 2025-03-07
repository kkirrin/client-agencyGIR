import React from 'react';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';  

export default function MainComponent({ data }) {
  return (
    <section className={styles.main_section}>
      <div className='container'>
        <h2 className={styles.title}>
          Выберите объект
        </h2>

        <ul className={styles.list}>
          {data?.data?.objects?.map((item, idx) => { 
            return (
              <li className={styles.item} key={idx}>
                <Link to={`/object/${item.id}`} className={styles.item_link}> {/* Добавлена ссылка */}
                  <img src={item.img_s.url} alt={item.title || 'Изображение объекта'} className={styles.item_img} width={250} height={200} />
                  <p className={styles.item_title}>
                    {item.title ? item.title : 'Ошибка получения заголовка'}
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

