import React, { useState, useEffect } from 'react'
import styles from './style.module.scss';

const ComponentSearch = () => {

  const [ value, setValue ] = useState('');

  const handleChange = (e) => {
    let searchString = e.target.value;
    console.log(searchString);
    setValue(searchString);
  }

  return (
    <input
      onChange={(e) => handleChange(e)}
      className={styles.search} 
      placeholder='Поиск'
    />
  )
}

export default ComponentSearch