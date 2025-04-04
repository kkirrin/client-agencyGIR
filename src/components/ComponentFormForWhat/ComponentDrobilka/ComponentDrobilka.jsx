import styles from './style.module.scss';

import {CustomInput, ComponentDate, AddMoreBtn, CustomRadio, ChooseTimeBtn } from '../../../components';

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
                        <CustomInput id={1} type="text" placeholder="Введите тн." />
                    </div>

                    <div>
                        <label
                            htmlFor="2"
                            style={{ textAlign: 'start', fontWeight: 'medium' }}
                        >
                            Ост. Порт
                        </label>
                        <CustomInput id={2} type="text" placeholder="Введите тн." />
                    </div>

                    <div>
                        <label
                            htmlFor="3"
                            style={{ textAlign: 'start', fontWeight: 'medium' }}
                        >
                            Ост. ГиР
                        </label>
                        <CustomInput id={3} type="text" placeholder="Введите тн." />
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
                    <CustomInput id={4} type="text" placeholder="Введите наименование" />
                </div>
            </div>

            <div className={styles.date_wrapper}>
                <div className={styles.date_content}>
                    <p>Дата</p>
                    <ComponentDate />
                </div>

                <div className={styles.smena_content}>
                    <p>Смена</p>
                    <ChooseTimeBtn />
                </div>
            </div>
                    


            {items.map((item, idx) => {
                return (
                    <div id='repeatable' className='flex' key={idx}>
                        <div className={styles.data_container}>
                            <div className={styles.data}>
                                <p>Данные</p>
                                <div className={styles.data_wrapper}>
                                    <CustomRadio label={"Ремонт/ТО<"}  checkboxId={`checkbox${idx}`} />
                                    <CustomRadio label={"Отсутствие угля (О/У)"}  checkboxId={`checkbox${idx}`} />
                                    <CustomRadio label={"Запас"}  checkboxId={`checkbox${idx}`} />
                                </div>
                            </div>

                            <div className={styles.data}>
                                <p style={{ marginBottom: '10px' }}>Тоннаж </p> 
                                <CustomInput type="text" placeholder='Введите тн. '/>                                
                            </div>
                        </div>

                        <div className={styles.note}>
                            <p>Примечание</p>
                            <CustomInput type="text" placeholder="Введите примечание" />
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