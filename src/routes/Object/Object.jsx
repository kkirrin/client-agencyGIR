import React from 'react'
import { useParams } from 'react-router-dom';

import styles from './style.module.scss';

const Object = () => {
  const { id } = useParams();

  // Вероятно по этому id будет снова запрос, пока данные замокаю

  const mockData = {
    "data": {
      "id": 11,
      "documentId": "yxon55d950jiowczmrhysc4x",
      "createdAt": "2025-01-29T23:41:41.342Z",
      "updatedAt": "2025-02-04T00:12:38.701Z",
      "publishedAt": "2025-02-04T00:12:38.777Z",
      "objects": [
        {
          'name': 'АО "Находкинский морской торговый порт" (УТ-1)',
        }
      ]
    }
  }

  return (
    <section className={styles.main_section}>
      <div className="container">
        <div className={styles.top}>

        </div>

        <div className={styles.table}>

        </div>

        <div className={styles.add_workers}>

        </div>
      </div>
    </section>
  )
}

export default Object