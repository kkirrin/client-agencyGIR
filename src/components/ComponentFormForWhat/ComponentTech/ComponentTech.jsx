import styles from './style.module.scss';
import deleteSVG from '/delete.svg';

import { CustomInput, AddMoreBtn, CustomCheckBox, ChooseTimeBtn, ComponentDateSingle } from '../../../components';
import useDataRequestStore from '../../../store/DataRequestStore';

const STATUS_CHECKBOXES = [
    {
        "value": "Default",
        "label": "-",
        "id": "statusDefault"
    },
    {
        "value": "inworking",
        "label": "В работе",
        "id": "checkboxinworking"
    },
    {
        "value": "repairto",
        "label": "Ремонт/ТО",
        "id": "checkboxrepairto"
    },
    {
        "value": "nocoal",
        "label": "Отсутствие угля (О/У)",
        "id": "checkboxnocoal"
    },
    {
        "value": "stock",
        "label": "Запас",
        "id": "checkboxstock"
    },
]

const DeleteDateItem = ({ id }) => {

    const { data } = useDataRequestStore();
    const userId = data[0]?.documentId;
    const dayDataDetails = data[0]?.DayDataDetails;
    const url = `http://89.104.67.119:1337/api/people/${userId}`;

    const handleClick = async (e) => {
        e.preventDefault();

        if (!window.confirm("Вы точно хотите удалить рабочую смену?")) return;

        // Создаем копию исходных данных
        const updatedDayDataDetails = [...dayDataDetails];

        // Находим и удаляем элемент с соответствующим id
        for (let i = 0; i < updatedDayDataDetails.length; i++) {
            const day = updatedDayDataDetails[i];
            // Проверяем DayInfo
            if (day.DayInfo && day.DayInfo.id === id) {
                // Если удаляем DayInfo, оставляем структуру с null
                updatedDayDataDetails[i] = {
                    ...day,
                    DayInfo: null,
                    NightInfo: day.NightInfo || null
                };
                break;
            }

            // Проверяем NightInfo
            if (day.NightInfo && day.NightInfo.id === id) {
                // Если удаляем NightInfo, оставляем структуру с null
                updatedDayDataDetails[i] = {
                    ...day,
                    DayInfo: day.DayInfo || null,
                    NightInfo: null
                };
                break;
            }
        }

        // Фильтруем полностью пустые записи (где и DayInfo и NightInfo null)
        const cleanedDayDataDetails = updatedDayDataDetails
            .filter(day => day.DayInfo !== null || day.NightInfo !== null)
            .map(day => ({
                DayInfo: day.DayInfo ? {
                    Day: day.DayInfo.Day,
                    SmenaDetails: {
                        SmenaStatusWorker: day.DayInfo.SmenaDetails?.SmenaStatusWorker,
                        SmenaDataTonnaj: day.DayInfo.SmenaDetails?.SmenaDataTonnaj,
                        Note: day.DayInfo.SmenaDetails?.Note,
                        TC: day.DayInfo.SmenaDetails?.TC,
                        SmenaDateDetails: day.DayInfo.SmenaDetails?.SmenaDateDetails,
                    }
                } : null,
                NightInfo: day.NightInfo ? {
                    Night: day.NightInfo.Night,
                    SmenaDetails: {
                        SmenaStatusWorker: day.NightInfo.SmenaDetails?.SmenaStatusWorker,
                        SmenaDataTonnaj: day.NightInfo.SmenaDetails?.SmenaDataTonnaj,
                        Note: day.NightInfo.SmenaDetails?.Note,
                        TC: day.NightInfo.SmenaDetails?.TC,
                        SmenaDateDetails: day.NightInfo.SmenaDetails?.SmenaDateDetails,
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
            window.location.reload();

        } catch (error) {
            console.error('Ошибка:', error);
        }
    };


    return (
        <button className={styles.delete_section} aria-current onClick={handleClick}>
            <img src={deleteSVG} alt='deleteSVG' width={15} height={15} />
        </button>
    )
};

export default function ComponentTech({ handleClickBtn, items, register, errors, shiftType, popupId }) {

    const { data } = useDataRequestStore();

    const targetDate = new Date("2025-04-04"); // ISO формат

    return (
        <>
            <div>
                <div className={styles.wrapper_name}>
                    <div>
                        <label
                            htmlFor="4"
                            style={{ textAlign: 'start', fontWeight: 'medium' }}
                        >
                            Наименование
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
                            Порядковый №
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

                {items
                    .map((item, idx) => {
                        return (
                            <>
                                <div className='flex relative' id={`repeatable-${idx}`} key={idx}>
                                    {data ? <DeleteDateItem id={item.id} /> : ''}
                                    <div className={styles.date_wrapper}>
                                        <div className={styles.date_content}>
                                            <p>Дата</p>
                                            <ComponentDateSingle idx={idx} dateForRender={item?.SmenaDetails?.SmenaDateDetails} />
                                        </div>

                                        <div className={styles.smena_content}>
                                            <p>Смена</p>
                                            <div className={styles.smena_btns}>
                                                <ChooseTimeBtn
                                                    idx={idx}
                                                    register={register}
                                                    shiftType={shiftType}
                                                    day={item.Day}
                                                    night={item.Night}
                                                    popupId={popupId}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.data_container}>
                                    <div className={styles.data}>
                                        <p>Данные</p>
                                        <div className={styles.data_wrapper}>
                                            {STATUS_CHECKBOXES.map((checkbox, index) => (
                                                <CustomCheckBox
                                                    data={data}
                                                    key={`${checkbox.id}-${index}`}
                                                    name={`${'statusWorker'}.${idx}`}
                                                    register={register}
                                                    type="radio"
                                                    value={checkbox.value}
                                                    label={checkbox.label}
                                                    checkboxId={`${checkbox.id}.${idx}`}
                                                    idx={idx}
                                                    hidden={index === 0}
                                                    defaultChecked={index === 0} // Отмечаем первый элемент
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.note}>
                                    <p>Примечание</p>
                                    <CustomInput
                                        data={data}
                                        item={item}
                                        id={8}
                                        name={'note'}
                                        errors={errors}
                                        register={register}
                                        type="text"
                                        placeholder="Введите примечание"
                                        idx={idx}
                                    />
                                </div>
                            </>
                        )
                    })
                }

                <div style={{ height: '40px', marginTop: '20px' }}>
                    <AddMoreBtn
                        onHandleClick={handleClickBtn}
                        title={'Добавить еще'}
                    />
                </div>
            </div >
        </>
    )
}