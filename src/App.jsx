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
      // Иммитация загрузки
      await delay(2000);  

      // Моковые данные
      const mockData = [
        { id: 1, name: 'АО "Находкинский морской торговый порт" (УТ-1)', description: 'Description 1' },
        { id: 2, name: 'АО "Находкинский морской торговый порт" (ГУТ-2)', description: 'Description 2' },
        { id: 3, name: 'АО "Порт Вера"', description: 'Description 3' },
        { id: 4, name: 'ООО "Морской Порт "Суходол"', description: '' },
        { id: 5, name: 'Дробильные установки', description: '' },
        { id: 6, name: 'Техника', description: '' },
      ];

      setData(mockData);
      setDataLoading(false); 
    };

    fetchData();
  }, []);

  return (
    <div className='page-wrapper'>
      {/* Suspense пригодится когда будет асинхронный запрос, или нет хз */}
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