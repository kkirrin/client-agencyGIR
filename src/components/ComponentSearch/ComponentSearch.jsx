import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import fetchData from '../../utils/fetchData';
import useDataRequestStore from '../../store/DataRequestStore';

import styles from './style.module.scss'

const domain = 'http://89.104.67.119:1337'

const ComponentSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataList, setData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const { setDataRequest } = useDataRequestStore();

  const { id } = useParams();
  const debounceTimeout = useRef(null)

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleClick = (person) => {
    setDataRequest(person);
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    if (inputValue.trim() === '') {
      setData([])
      return
    }

    setLoading(true)
    debounceTimeout.current = setTimeout(async () => {
      try {
        // Фильтрация по персоне - получает всю инфу по челику
        // const queryUrl = `${domain}/api/people?filters[$or][0][Name][$containsi]=${encodeURIComponent(inputValue)}&filters[$or][1][Job][$containsi]=${encodeURIComponent(inputValue)}&populate[People][populate]=*`
        // const queryUrl = `${domain}/api/objects?filters[id][$eq]=${id}&populate[workers][populate]=*&filters[workers][Name][$containsi]=${encodeURIComponent(inputValue)}`;

        const peopleUrl = `${domain}/api/people?filters[Name][$containsi]=${encodeURIComponent(inputValue)}&populate=*`
        const techicaUrl = `${domain}/api/techicas?filters[Name][$containsi]=${encodeURIComponent(inputValue)}&populate=*`
        const drobilkaUrl = `${domain}/api/drobilkas?filters[Name][$containsi]=${encodeURIComponent(inputValue)}&populate=*`

        const [peopleData, techicaData, drobilkaData] = await Promise.all([
          fetchData(peopleUrl),
          fetchData(techicaUrl),
          fetchData(drobilkaUrl)
        ]);

        const combinedResults = [
          ...peopleData,
          ...techicaData,
          ...drobilkaData
        ];

        setData(combinedResults);

        // const res = await fetchData(drobilkaUrl);
        // setData(res);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки Объектов:', error)
        setLoading(false);
      }
    }, 1000)

    return () => clearTimeout(debounceTimeout.current)
  }, [inputValue])

  return (
    <div className='relative'>
      <input
        type='text'
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)} // задержка, чтобы кликнуть по элементу
        className={styles.search}
        placeholder='Поиск'
      />
      {
        isFocused && (
          <ul className={styles.list}>
            {inputValue.trim() === '' && <li>Начните печатать</li>}
            {loading && <img src='/download.png' className={styles.image} />}
            {!loading && dataList.length === 0 && inputValue.trim() !== '' && (
              <li>Ничего не найдено</li>
            )}

            {
              !loading &&
              dataList.map((person, index) => (
                <li key={person.id || index} className={styles.item}>
                  <p onClick={() => handleClick(person)}>{person.Name}</p>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
}


export default ComponentSearch