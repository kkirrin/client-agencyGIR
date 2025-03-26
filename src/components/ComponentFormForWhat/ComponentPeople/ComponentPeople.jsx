import styles from './style.module.scss';
import deleteSVG from '/delete.svg';

import { CustomInput, AddMoreBtn, CustomCheckBox, ChooseTimeBtn, ComponentDateSingle } from '../../../components';
import useDataRequestStore from '../../../store/DataRequestStore';
import { deleteService } from '../../../services/delete-service';

const DeleteSection = ({ data, url }) => {
    return (
        <div>
            <button aria-current onClick={(e) => {
                e.preventDefault();
                deleteService(data, url + data[0]?.id)
            }}>
                <img src={deleteSVG} alt='deleteSVG' width={15} height={15} />
            </button>
        </div>
    )
};

export default function ComponentPeople({ handleClickBtn, items, register, errors }) {
    const { data } = useDataRequestStore();

    const url = `http://89.104.67.119:1337/api/people/`;

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
                                data={data}  
                                errors={errors} 
                                register={register} 
                                name={'AmountData'}
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
                                data={data} 
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
                                data={data}  
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
                            data={data}  
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
                            data={data}  
                            errors={errors} 
                            register={register} 
                            id={5} 
                            name={'Job'}
                            type="text" 
                            placeholder="Введите должность"
                        />
                    </div>
                </div>

                {data ? <DeleteSection data={data} url={url} /> : ''}

                {items.map((item, idx) => {
                    return (
                        <div className='flex'id='repeatable' key={idx}>
                            <div className={styles.date_wrapper}>
                                <div className={styles.date_content}>
                                    <p>Дата</p>
                                    <ComponentDateSingle />
                                </div>

                                <div className={styles.smena_content}>
                                    <p>Смена</p>
                                    <div className={styles.smena_btns}>
                                        <ChooseTimeBtn register={register}/>
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
                                            name="statusWorkerNotWorked"
                                            value={'Not working'}
                                            label="Не работал" 
                                            checkboxId="checkboxNotWorked" 
                                        />
                                        <CustomCheckBox 
                                            errors={errors} 
                                            register={register} 
                                            type="checkbox" 
                                            name="statusWorkerDayOff"
                                            value={'Day Off'}
                                            label="Выходной" 
                                            checkboxId="checkboxDayOff" 
                                        />
                                        <CustomCheckBox 
                                            errors={errors} 
                                            register={register} 
                                            type="checkbox" 
                                            name="statusWorkerEmpty"
                                            value={'Empty'}
                                            label="Пусто" 
                                            checkboxId="checkboxEmpty" 
                                        />
                                    </div>
                                </div>

                                <div className={styles.data}>
                                    <p style={{ marginBottom: '10px' }}>Тоннаж</p> 
                                    <CustomInput 
                                        data={data}  
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
                                        data={data}  
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
                                    data={data}  
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