import styles from './style.module.scss';

import { CustomInput, ComponentDate, AddMoreBtn, CustomCheckBox } from '../../../components';

export default function ComponentTech({ handleClickBtn, items }) {
    return (
        <>
            <div className={styles.wrapper_name}>
                <div>
                    <label
                        htmlFor="4"
                        style={{ textAlign: 'start', fontWeight: 'bold' }}
                        >
                        Наименование
                    </label>
                    <CustomInput id={4} placeholder="Введите наименование" />
                </div>

                <div>
                    <label
                        htmlFor="5"
                        style={{ textAlign: 'start', fontWeight: 'bold' }}
                    >
                        Порядковый №
                    </label>
                    <CustomInput id={5} placeholder="Введите номер" />
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
                        <div className={styles.data}>
                            <p>Данные</p>
                            <div className={styles.data_wrapper}>
                                <CustomCheckBox label={"В работе"} checkboxId={'checkbox1'} />
                                <CustomCheckBox label={"Ремонт/ТО"} checkboxId={'checkbox2'} />
                                <CustomCheckBox label={"Отсутствие угля (О/У)"} checkboxId={'checkbox2'} />
                                <CustomCheckBox label={"Запас"} checkboxId={'checkbox3'} />                         
                            </div>
                        </div>

                        <div className={styles.note}>
                            <p>Примечание</p>
                            <CustomInput placeholder="Введите примечание" />
                        </div>
                        
                    </div>
                )
            })}
           
            <div style={{ height: '40px', marginTop: '20px'}}>
                <AddMoreBtn 
                    onHandleClick={handleClickBtn} 
                    title={'Добавить еще'}
                />
            </div>

        </>
    )
}