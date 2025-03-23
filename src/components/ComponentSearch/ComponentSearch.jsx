/**
 * TODO: Поиск пока только по Person и Job
 * 1. поиск по Drobilka, Techica
 * 2. зЧто делать с результатами поиска?
 */
import { useState, useEffect, useRef } from 'react'
import fetchData from '../../utils/fetchData'

import styles from './style.module.scss'

const domain = 'http://89.104.67.119:1337'

const ComponentSearch = () => {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [isFocused, setIsFocused] = useState(false)

  const debounceTimeout = useRef(null)

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

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
        const queryUrl = `${domain}/api/people?filters[$or][0][Name][$containsi]=${encodeURIComponent(inputValue)}&filters[$or][1][Job][$containsi]=${encodeURIComponent(inputValue)}`
        const res = await fetchData(queryUrl)
        setData(res)
        setLoading(false)
      } catch (error) {
        console.error('Ошибка загрузки Объектов:', error)
        setLoading(false)
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
      {isFocused && (
        <ul className={styles.list}>
          {inputValue.trim() === '' && <li>Начните печатать</li>}
          {loading && <img src='/download.png' className={styles.image} />}
          {!loading && data.length === 0 && inputValue.trim() !== '' && (
            <li>Ничего не найдено</li>
          )}
          {!loading &&
            data.map((person) => (
              <li key={person.id} className={styles.item}>
                {person.Name}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}


export default ComponentSearch