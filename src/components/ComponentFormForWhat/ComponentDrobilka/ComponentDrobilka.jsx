import styles from './style.module.scss';

import {CustomInput, ComponentDate, AddMoreBtn } from '../../../components';

export default function ComponentDrobilka({ handleClickBtn, items }) {
    return (
        <>
            <div className={styles.form_content}>
                <p className={styles.form_title_content}>Тоннаж месяц</p>
                <div className={styles.wrapper_input}>
                    <div>
                        <label
                            htmlFor="1"
                            style={{ textAlign: 'start', fontWeight: 'medium' }}
                        >
                            Тоннаж выставили
                        </label>
                        <CustomInput id={1} placeholder="Введите тн." />
                    </div>

                    <div>
                        <label
                            htmlFor="2"
                            style={{ textAlign: 'start', fontWeight: 'medium' }}
                        >
                            Ост. Порт
                        </label>
                        <CustomInput id={2} placeholder="Введите тн." />
                    </div>

                    <div>
                        <label
                            htmlFor="3"
                            style={{ textAlign: 'start', fontWeight: 'medium' }}
                        >
                            Ост. ГиР
                        </label>
                        <CustomInput id={3} placeholder="Введите тн." />
                    </div>
                </div>
            </div>

            <div className={styles.wrapper_name}>
                <div>
                    <label
                        htmlFor="4"
                        style={{ textAlign: 'start', fontWeight: 'medium' }}
                    >
                        Наименование
                    </label>
                    <CustomInput id={4} placeholder="Введите наименование" />
                </div>
            </div>

            <div className={styles.date_wrapper}>
                <div className={styles.date_content}>
                    <p>Дата</p>
                    <ComponentDate />
                </div>

                <div className={styles.smena_content}>
                    <p>Смена</p>
                    <div className={styles.smena_btns}>
                        <button className={`${styles.smena_btn} ${styles.day}`}>
                            <img src={'/sun.svg'} alt='' />
                            <p>День</p>
                        </button>
                        <button className={`${styles.smena_btn} ${styles.night}`}>
                            <img src={'/moon.svg'} alt='' />
                            <p>Ночь</p>
                        </button>
                    </div>
                </div>
            </div>


            {items.map((item, idx) => {
                return (
                    <div id='repeatable' className='flex' key={idx}>
                        <div className={styles.data_container}>
                            <div className={styles.data}>
                                <p>Данные</p>
                                <div className={styles.data_wrapper}>
                                    <div className={styles.data_item}>
                                        <input type="checkbox" />
                                        <p>Ремонт/ТО</p>
                                    </div>

                                    <div className={styles.data_item}>
                                        <input type="checkbox" />
                                        <p>Отсутствие угля (О/У)</p>
                                    </div>

                                    <div className={styles.data_item}>
                                        <input type="checkbox" />
                                        <p>Запас</p>
                                    </div>

                                </div>
                            </div>

                            <div className={styles.data}>
                                <p style={{ marginBottom: '10px' }}>Тоннаж </p> 
                                <CustomInput placeholder='Введите тн. '/>                                
                            </div>
                        </div>

                        <div className={styles.note}>
                            <p>Примечание</p>
                            <CustomInput placeholder="Введите примечание" />
                        </div>
                    </div>
                )
            })}
         


            <AddMoreBtn 
                onHandleClick={handleClickBtn} 
                title={'Добавить еще'}
            />
        </>
    )
}