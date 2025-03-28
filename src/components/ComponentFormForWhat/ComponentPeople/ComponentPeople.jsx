import styles from './style.module.scss';
import deleteSVG from '/delete.svg';

import { CustomInput, AddMoreBtn, CustomCheckBox, ChooseTimeBtn, ComponentDateSingle } from '../../../components';
import useDataRequestStore from '../../../store/DataRequestStore';

const DeleteDateItem = ({ id }) => {
    const { data } = useDataRequestStore();
    const userId = data[0]?.documentId;
    const dayDataDetails = data[0]?.DayDataDetails;
    const url = `http://89.104.67.119:1337/api/people/${userId}`;

    const handleClick = async (e) => {
        e.preventDefault();

        if (!window.confirm("Вы точно хотите удалить рабочую смену?")) return;

        const cleanedDayDataDetails = dayDataDetails
            .filter(item => item.id !== id)
            .map(({ DayInfo, NightInfo }) => ({
                DayInfo: DayInfo ? {
                    Day: DayInfo.Day,
                    SmenaDetails: {
                        SmenaStatusWorker: DayInfo.SmenaDetails?.SmenaStatusWorker,
                        SmenaDataTonnaj: DayInfo.SmenaDetails?.SmenaDataTonnaj,
                        Note: DayInfo.SmenaDetails?.Note,
                        TC: DayInfo.SmenaDetails?.TC,
                        SmenaDateDetails: DayInfo.SmenaDetails?.SmenaDateDetails,
                    }
                } : null,
                NightInfo: NightInfo ? {
                    Night: NightInfo.Night,
                    SmenaDetails: {
                        SmenaStatusWorker: NightInfo.SmenaDetails?.SmenaStatusWorker,
                        SmenaDataTonnaj: NightInfo.SmenaDetails?.SmenaDataTonnaj,
                        Note: NightInfo.SmenaDetails?.Note,
                        TC: NightInfo.SmenaDetails?.TC,
                        SmenaDateDetails: NightInfo.SmenaDetails?.SmenaDateDetails,
                    }
                } : null
            }));

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: { DayDataDetails: cleanedDayDataDetails }
                })
            });

            if (!response.ok) throw new Error('Ошибка при обновлении компонента');

            alert('Рабочая смена удалена');

        } catch (error) {
            console.error('Ошибка:', error);
        }
    };


    return (
        <button className={styles.delete_section} aria-current onClick={handleClick}>
            <img src={deleteSVG} alt='deleteSVG' width={15} height={15} />
        </button>
    )

    // ==============================================
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

                {items.map((item, idx) => {
                    return (
                        <div className='flex relative' id={`repeatable-${idx}`} key={idx}>
                            {data ? <DeleteDateItem id={item.id} /> : ''}
                            <div className={styles.date_wrapper}>
                                <div className={styles.date_content}>
                                    <p>Дата</p>
                                    <ComponentDateSingle idx={idx} />
                                </div>

                                <div className={styles.smena_content}>
                                    <p>Смена</p>
                                    <div className={styles.smena_btns}>
                                        <ChooseTimeBtn register={register} idx={idx} />
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
                                            idx={idx}
                                        />
                                        <CustomCheckBox
                                            errors={errors}
                                            register={register}
                                            type="checkbox"
                                            name="statusWorkerDayOff"
                                            value={'Day Off'}
                                            label="Выходной"
                                            checkboxId="checkboxDayOff"
                                            idx={idx}
                                        />
                                        <CustomCheckBox
                                            errors={errors}
                                            register={register}
                                            type="checkbox"
                                            name="statusWorkerEmpty"
                                            value={'Empty'}
                                            label="Пусто"
                                            checkboxId="checkboxEmpty"
                                            idx={idx}
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
                                        idx={idx}
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
                                        idx={idx}
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
                                    idx={idx}
                                />
                            </div>
                        </div>
                    )
                })}

                <div style={{ height: '40px', marginTop: '20px' }}>
                    <AddMoreBtn
                        onHandleClick={handleClickBtn}
                        title={'Добавить еще'}
                    />
                </div>
            </div>
        </>
    )
}