import { Suspense, useState, useEffect } from 'react';
import { Loading, MainComponent } from './components';
import fetchData from './utils/fetchData';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // /api/objects/:id
  const domain = 'http://89.104.67.119:1337';
  const url = `${domain}/api/objects?populate=*`;

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
      {/* <Suspense fallback={<Loading />}> */}
      <main>
        {dataLoading ? (
          <Loading />
        ) : (
          <MainComponent data={data} />
        )}
      </main>
      {/* </Suspense> */}
    </div >
  );
}

export default App;

