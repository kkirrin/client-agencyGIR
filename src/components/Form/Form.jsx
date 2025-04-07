import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import styles from './style.module.scss';
import { updateUserDateService } from '../../services/update-service';
import useDataRequestStore from '../../store/DataRequestStore';

import { useParams } from 'react-router-dom';
import {
    BtnSave,
    DeleteButton,
    ComponentDrobilka,
    ComponentPeople,
    ComponentTech
} from '../../components';

import useDateSingleStore from '../../store/CalendarSingleStore';

const url = 'http://89.104.67.119:1337/api/people/';


// Проверка существования записи по UUID
export async function checkExistingRecord(uuid) {

    try {
        const response = await fetch(`${url}?filters[uuid][$eq]=${uuid}`);
        const result = await response.json();
        // Для Strapi структура ответа: { data: [...] }
        return result.data?.length > 0 ? result.data[0]?.documentId : null;
    } catch (error) {
        console.error('Ошибка:', error);
        return null;
    }
}

export async function saveUserDateService(userData, url) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { ...userData } }),
    });

    const data = await response.json();
    return { response, data };
}

export default function Form({ title, forWhat, setActive, popupId }) {
    // console.log(forWhat);


    const [error, setError] = useState();
    const [isSending, setIsSending] = useState(false);
    const [shiftType, setShiftType] = useState([]);
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        defaultValues: {
            statusWorker: ['Default']
        }
    });

    const { dates } = useDateSingleStore();
    const { id } = useParams();
    const { data } = useDataRequestStore();

    // Правильное определение формата
    const formatOptions = {
        locale: 'ru-RU',
        options: {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }
    };

    // Форматирование дат с учетом:
    // 1. Проверки на валидность даты
    // 2. Преобразования объекта dates в массив
    // 3. Корректного использования toLocaleDateString

    const [datesFromData, setDatesFromData] = useState([]);


    useEffect(() => {
        // Получаем даты из данных
        const dates = data[0]?.DayDataDetails?.map(d =>
            d?.DayInfo?.SmenaDetails?.SmenaDateDetails ||
            d?.NightInfo?.SmenaDetails?.SmenaDateDetails
        ) || [];

        setDatesFromData(dates);
    }, [data]);

    // console.log('datesFromData!!!!!!!!!!', datesFromData)

    // Формируем итоговый массив дат
    const formattedDates = (() => {

        // Объединяем данные из двух источников
        const allDates = [
            ...datesFromData,
            ...Object.values(dates).filter(date => date instanceof Date && !isNaN(date)).map(date => date.toLocaleDateString(formatOptions.locale, formatOptions.options))
        ];

        // предположительно тут конфилкт 
        //   console.log('allDates!!!!!!!', allDates);

        // Фильтруем и форматируем
        // console.log(allDates)
        return allDates;
    })();

    // console.log(Object.values(dates));
    // console.log(datesFromData);
    // console.log(datesFromData, formattedDates)

    /**
     * 
     * TODO: надо подумать, как при первом рендере
     * показывать  то, что уже вбито в поля и чтобы они
     * были перезаписываемы
     */
    useEffect(() => {
        if (data && data[0]) {
            reset({
                Name: data[0].Name || "",
                Job: data[0].Job || "",

                shiftType: data[0].DayDataDetails?.map(i => {
                    if (i?.DayInfo?.Day) return "day";
                    if (i?.NightInfo?.Night) return "night";
                    return ""; // Дефолтное значение
                }) || [],
                statusWorker: data[0]?.DayDataDetails?.map(i => {
                    i?.DayInfo?.SmenaDetails?.SmenaStatusWorker ||
                        i?.NightInfo?.SmenaDetails?.SmenaStatusWorker
                }) || [],
                note: data[0]?.DayDataDetails?.map(i => {
                    i?.DayInfo?.SmenaDetails?.Note ||
                        i?.NightInfo?.SmenaDetails?.Note
                }) || []
            })
        }
    }, [data, reset]);


    /**
     *
     * TODO: нужно перебором делать проверку массива
    */

    const name = useWatch({ control, name: 'Name' });
    const job = useWatch({ control, name: 'Job' });
    const amountData = useWatch({ control, name: 'AmountData' });
    const dayDataOstatkiPORT = useWatch({ control, name: 'DayDataOstatkiPORT' });
    const dayDataOstatkiGIR = useWatch({ control, name: 'DayDataOstatkiGIR' });
    const dayDataTonnaj = useWatch({ control, name: 'DayDataTonnaj' });
    const TC = useWatch({ control, name: 'TC' });
    const note = useWatch({ control, name: 'note' });
    const shiftTypeArray = useWatch({ control, name: 'shiftType' });

    const statusValues = useWatch({ control, name: 'statusWorker' });

    // Следим за изменением значений
    // Получаем весь массив значений

    useEffect(() => {
        if (!shiftTypeArray) return;

        let newShiftType = [];

        // Проходим по всем элементам массива
        shiftTypeArray.forEach((i, idx) => {
            if (i === 'day') {
                setValue(`btnNight.${idx}`, false);
                newShiftType.push('day');
            } else if (i === 'night') {
                setValue(`btnDay.${idx}`, false);
                newShiftType.push('night');
            } else {
                newShiftType.push('day');
            }
        });

        setShiftType(newShiftType);

    }, [shiftTypeArray, setValue]);

    /**
     * Устанавливаем массив объектов DayDataDetails
    */
    const [items, setItems] = useState([]);
    useEffect(() => {
        if (data && data.length > 0) {
            let itemsArray = [];
            data[0].DayDataDetails.forEach(day => {
                if (day.DayInfo) {
                    itemsArray.push(day.DayInfo);
                }
                if (day.NightInfo) {
                    itemsArray.push(day.NightInfo);
                }
            });

            setItems(itemsArray);
        }
    }, [data]);

    const handleClick = (e) => {
        e.preventDefault();
        setItems([...items, items.length + 1]);
    };

    const objectUUID = data[0]?.uuid

    /**
     * ПОИСК ДУБЛИКАТОВ 
    */

    const dublicateDates = formattedDates.reduce((acc, d) => {
        acc[d] = (acc[d] || 0) + 1;
        return acc;
    }, {})

    const onSubmit = async () => {
        setIsSending(true);
        setError(null);

        const formData = {

            uuid: objectUUID ? objectUUID : uuidv4(),
            Name: name || "",
            Job: job || "",
            Objects: [
                {
                    id: id,
                }
            ],
            MonthDataTonnaj: [
                {
                    AmountData: amountData || "0",
                    MonthData: formattedDates[0] || '0',
                },
            ],

            DayDataOstatki: [
                {
                    DayDataOstatki: formattedDates[0] || '0',
                    DayDataOstatkiGIR: dayDataOstatkiGIR || "0",
                    DayDataOstatkiPORT: dayDataOstatkiPORT || "0",
                },
            ],
        };


        formData.DayDataDetails = items.reduce((acc, item, idx) => {
            // текущая дата по индексу (с ней сранивается есть ли дубликат)
            const currentDate = formattedDates[idx];
            // Проверка даты на дубликат
            const isDuplicate = dublicateDates[currentDate] > 1;
            // записывается статус по индексу
            const status = statusValues[idx] || 'Default';

            // формирую данные сотрудника общие
            const commonDetails = {
                Note: note?.[idx] || "-",
                SmenaDataTonnaj: dayDataTonnaj?.[idx] || "0",
                SmenaDateDetails: currentDate || '0',
                SmenaStatusWorker: status,
                TC: TC?.[idx] || "-"
            };

            // Находим существующую запись для этой даты
            const existingEntry = acc.find(e =>
                e.DayInfo?.SmenaDetails.SmenaDateDetails === currentDate ||
                e.NightInfo?.SmenaDetails.SmenaDateDetails === currentDate
            );

            // если есть дубликат и уже сущ.
            if (isDuplicate && existingEntry) {
                // Добавляем вторую смену к существующей записи
                if (shiftTypeArray[idx] === 'day') {
                    existingEntry.DayInfo = { Day: true, SmenaDetails: commonDetails };
                } else {
                    existingEntry.NightInfo = { Night: true, SmenaDetails: commonDetails };
                }
                // добавляет к массиву вот такой объект если все норм
            } else {
                const shiftType = shiftTypeArray[idx] ? shiftTypeArray[idx] : 'day';
                if (typeof shiftType === 'undefined') {
                    console.error('shiftType равен undefined для индекса', idx);
                    return acc;
                } else {
                    console.log(true)
                    acc.push({
                        ...(shiftType === 'day'
                            ? { DayInfo: { Day: true, SmenaDetails: commonDetails } }
                            : { NightInfo: { Night: true, SmenaDetails: commonDetails } }
                        )
                    }
                    )
                }
            }


            console.log(acc);
            return acc;
        }, []);


        try {
            const existingRecordId = await checkExistingRecord(objectUUID);
            let response;

            if (existingRecordId) {
                response = await updateUserDateService(

                    existingRecordId,
                    formData,
                    url
                );
                console.log('Данные обновлены:', response, formData);
            } else {
                response = await saveUserDateService(formData, url);
                console.log('Новая запись создана:', response, formData);
            }

        } catch (error) {
            setError('Ошибка запроса, попробуйте позже', error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form_wrapper}>
                <div className={styles.form_header}>
                    <div>
                        <h2 className={styles.form_title}>
                            {title}
                        </h2>
                    </div>

                    <div className={styles.form_title_info}>
                        <div className={styles.btn_save_wrapper}>
                            <BtnSave isSending={isSending} />
                            <DeleteButton setActive={setActive} />
                        </div>
                    </div>
                </div>

                {forWhat === 'people' && (
                    <ComponentPeople
                        handleClickBtn={handleClick}
                        items={items}
                        register={register}
                        errors={errors}
                        shiftType={shiftType}
                        setItems={setItems}
                        popupId={popupId}
                    />
                )}

                {forWhat === 'tech' && (
                    <ComponentTech
                        handleClickBtn={handleClick}
                        items={items}
                        register={register}
                        errors={errors}
                        shiftType={shiftType}
                        setItems={setItems}
                        popupId={popupId}
                    />
                )}

                {forWhat === 'drobilka' && (
                    <ComponentDrobilka
                        handleClickBtn={handleClick}
                        items={items}
                        register={register}
                    />
                )}
            </div>
        </form>
    )
}