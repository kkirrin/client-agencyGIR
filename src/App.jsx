import { Suspense, useState, useEffect } from 'react';
import { Loading, MainComponent } from './components';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Имитация загрузки
      await delay(2000);

      // Моковые данные
      const mockData = {
        "data": {
          "id": 11,
          "documentId": "yxon55d950jiowczmrhysc4x",
          "createdAt": "2025-01-29T23:41:41.342Z",
          "updatedAt": "2025-02-04T00:12:38.701Z",
          "publishedAt": "2025-02-04T00:12:38.777Z",
          "speczializaczii": [
            {
              "id": 163,
              "title": "АО Находкинский морской торговый порт (УТ-1)",
              "slug": "test",
              "img_s": {
                "id": 33,
                "documentId": "pv47xam4t39u1xqoxasqrqwo",
                "url": "/uploads/spec_1_4efe76f5b1.png"
              }
            },
            {
              "id": 164,
              "title": "АО Находкинский морской торговый порт (ГУТ-2)",
              "slug": "test",
              "img_s": {
                "id": 32,
                "documentId": "gkm97lbgw912orolqcet13jy",
                "url": "/uploads/image_2131e0cfce.png"
              }
            },
            {
              "id": 165,
              "title": "АО Порт Вера",
              "slug": "test",
              "img_s": {
                "id": 32,
                "documentId": "gkm97lbgw912orolqcet13jy",
                "url": "/uploads/image_2131e0cfce.png"
              }
            },
            {
              "id": 166,
              "title": "ООО Морской Порт Суходол",
              "slug": "test",
              "img_s": {
                "id": 32,
                "documentId": "gkm97lbgw912orolqcet13jy",
                "url": "/uploads/image_2131e0cfce.png"
              }
            },
            {
              "id": 167,
              "title": "Дробильные установки",
              "slug": "test",
              "img_s": {
                "id": 32,
                "documentId": "gkm97lbgw912orolqcet13jy",
                "url": "/uploads/image_2131e0cfce.png"
              }
            },
            {
              "id": 168,
              "title": "Техника",
              "slug": "test",
              "img_s": {
                "id": 32,
                "documentId": "gkm97lbgw912orolqcet13jy",
                "url": "/uploads/image_2131e0cfce.png"
              }
            }
          ]
        }
      };

      setData(mockData);
      setDataLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className='page-wrapper'>
      <Suspense fallback={<Loading />}>
        <main>
          {dataLoading ? (
            <Loading />
          ) : (
            <MainComponent data={data} />
          )}
        </main>
      </Suspense>
    </div>
  );
}

export default App;

