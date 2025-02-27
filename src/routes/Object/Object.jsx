import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.scss';
import { AddWorkerBtn, ComponentDate, ComponentSearch } from '../../components';


const Object = () => {
  const { id } = useParams();


  // Вероятно, по этому id будет снова запрос, пока данные замокаю
  const mockData = {
    "data": {
      "id": 11,
      "documentId": "yxon55d950jiowczmrhysc4x",
      "createdAt": "2025-01-29T23:41:41.342Z",
      "updatedAt": "2025-02-04T00:12:38.701Z",
      "objects": [
        {
          'name': 'АО "Находкинский морской торговый порт" (УТ-1)',
        }
      ]
    }
  };

  const object = mockData.data.objects.find(obj => obj.name); 

  if (!object) {
    return (
      <section className={styles.main_section}>
        <div className="container">
          <p>Объект не найден</p>
        </div>
      </section>
    );
  }

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

        <div className={styles.table}></div>

        <div className={styles.add_workers}>
          <AddWorkerBtn />
        </div>
      </div>
    </section>
  );
};

export default Object;

