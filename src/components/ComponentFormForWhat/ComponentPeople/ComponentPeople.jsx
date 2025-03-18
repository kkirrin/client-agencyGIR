import styles from './style.module.scss';

import { CustomInput, ComponentDate, AddMoreBtn, CustomCheckBox, ChooseTimeBtn } from '../../../components';

export default function ComponentPeople({ handleClickBtn, items, register, errors }) {

    return (
        <>
            <div>
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
                            <CustomInput 
                                errors={errors} 
                                register={register} 
                                name={'MonthDataTonnaj:{AmountData}'}
                                id={1} 
                                type="text" 
                                placeholder="Введите тн." 
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="2"
                                style={{ textAlign: 'start', fontWeight: 'medium' }}
                            >
                                Ост. Порт
                            </label>
                            <CustomInput 
                                errors={errors} 
                                register={register} 
                                name={'DayDataOstatkiPORT'}
                                id={2} 
                                type="text" 
                                placeholder="Введите тн." 
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="3"
                                style={{ textAlign: 'start', fontWeight: 'medium' }}
                            >
                                Ост. ГиР
                            </label>
                            <CustomInput 
                                errors={errors} 
                                register={register} 
                                id={3} 
                                name={'DayDataOstatkiGIR'}
                                type="text" 
                                placeholder="Введите тн." 
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.wrapper_name}>
                    <div>
                        <label
                            htmlFor="4"
                            style={{ textAlign: 'start', fontWeight: 'medium' }}
                        >
                            ФИО
                        </label>
                        <CustomInput 
                            errors={errors} 
                            register={register} 
                            id={4} 
                            name={'Name'}
                            type="text" 
                            placeholder="Введите ФИО"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="5"
                            style={{ textAlign: 'start', fontWeight: 'medium' }}
                        >
                            Должность
                        </label>
                        <CustomInput 
                            errors={errors} 
                            register={register} 
                            id={5} 
                            name={'Job'}
                            type="text" 
                            placeholder="Введите должность"
                        />
                    </div>
                </div>

                
                {items.map((item, idx) => {
                    return (
                        <div className='flex'id='repeatable' key={idx}>
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

                            <div className={styles.data_container}>
                                <div className={styles.data}>
                                    <p>Данные</p>
                                    <div className={styles.data_wrapper}>
                                        <CustomCheckBox 
                                            errors={errors} 
                                            register={register} 
                                            type="checkbox" 
                                            name={'statusWorker'}
                                            label={"Не работал"} 
                                            checkboxId={`checkbox${idx}`} 
                                        />
                                        <CustomCheckBox 
                                            errors={errors} 
                                            register={register} 
                                            type="checkbox" 
                                            name={'statusWorker'}
                                            label={"Выходной"} 
                                            checkboxId={`checkbox${idx}`} 
                                        />
                                        <CustomCheckBox 
                                            errors={errors} 
                                            register={register} 
                                            type="checkbox" 
                                            name={'statusWorker'}
                                            label={"Пусто"} 
                                            checkboxId={`checkbox${idx}`} 
                                        />
                                    </div>
                                </div>

                                <div className={styles.data}>
                                    <p style={{ marginBottom: '10px' }}>Тоннаж</p> 
                                    <CustomInput 
                                        id={6} 
                                        name={'DayDataTonnaj'}
                                        errors={errors} 
                                        register={register} 
                                        type="text" 
                                        placeholder='Введите тн. '
                                    />                              
                                </div>

                                <div className={styles.data}>
                                    <p style={{ marginBottom: '10px' }}>ТС</p> 
                                    <CustomInput 
                                        id={7} 
                                        name={'TC'}
                                        errors={errors} 
                                        register={register} 
                                        type="text" 
                                        placeholder='Введите ТС '
                                    />                              
                                </div>
                            </div>

                            <div className={styles.note}>
                                <p>Примечание</p>
                                <CustomInput 
                                    id={8} 
                                    name={'note'}
                                    errors={errors} 
                                    register={register} 
                                    type="text" 
                                    placeholder="Введите примечание" 
                                />
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
            </div>
        </>
    )
}