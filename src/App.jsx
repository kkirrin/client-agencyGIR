import { useState, useEffect } from 'react';
import { Loading, MainComponent } from './components';
import fetchData from './utils/fetchData';

function App() {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // /api/objects/:id
  const domain = 'http://89.104.67.119:1337';
  const url = `${domain}/api/objects?populate=*`;

  const dataGlobal = []; 

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData(url);
        setData(fetchedData);
      } catch (error) {
        console.error("Ошибка загрузки Объектов:", error);
      } finally {
        setDataLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className='page-wrapper'>
      <main>
        {dataLoading ? (
          <Loading />
        ) : (
          <MainComponent data={data} domain={domain} />
        )}
      </main>
    </div >
  );
}

export default App;

