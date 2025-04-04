import styles from './style.module.scss';

import { CustomInput, ComponentDate, AddMoreBtn, CustomRadio, ChooseTimeBtn } from '../../../components';

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
                    <CustomInput id={4} type="text" placeholder="Введите наименование" />
                </div>

                <div>
                    <label
                        htmlFor="5"
                        style={{ textAlign: 'start', fontWeight: 'bold' }}
                    >
                        Порядковый №
                    </label>
                    <CustomInput id={5} type="text" placeholder="Введите номер" />
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
                        <ChooseTimeBtn />
                    </div>
                </div>
            </div>

            {items.map((item, idx) => {
                return (
                    <div id='repeatable' className='flex' key={idx}>
                        <div className={styles.data}>
                            <p>Данные</p>
                            <div className={styles.data_wrapper}>
                                <CustomRadio type="checkbox" label={"В работе"} checkboxId={`checkbox${idx}`} />
                                <CustomRadio type="checkbox" label={"Ремонт/ТО"} checkboxId={`checkbox${idx}`} />
                                <CustomRadio type="checkbox" label={"Отсутствие угля (О/У)"} checkboxId={`checkbox${idx}`} />
                                <CustomRadio type="checkbox" label={"Запас"} checkboxId={`checkbox${idx}`} />                         
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