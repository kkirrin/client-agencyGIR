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


export async function checkExistingRecord(uuid, url) {

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
    const { data } = useDataRequestStore();
    const { dates } = useDateSingleStore();
    const { id } = useParams();

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
    } = useForm();

    // Правильное определение формата
    const formatOptions = {
        locale: 'ru-RU',
        options: {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }
    };

    const [datesFromData, setDatesFromData] = useState([]);

    useEffect(() => {

        const dates = data[0]?.DayDataDetails?.flatMap(d => {
            const dates = []
            if (d?.DayInfo?.SmenaDetails?.SmenaDateDetails) dates.push(d.DayInfo.SmenaDetails.SmenaDateDetails)
            if (d?.NightInfo?.SmenaDetails?.SmenaDateDetails) dates.push(d.NightInfo.SmenaDetails.SmenaDateDetails)
            if (d?.DayInfo?.date) dates.push(d.DayInfo.date)
            if (d?.NightInfo?.date) dates.push(d.NightInfo.date)
            return dates
        }) || [];

        setDatesFromData(dates);
    }, [data]);

    const formattedDates = (() => {

        const allDates = [
            ...datesFromData,
            ...Object.values(dates).filter(date => date instanceof Date && !isNaN(date)).map(date => date.toLocaleDateString(formatOptions.locale, formatOptions.options))
        ];

        return allDates;
    })();

    useEffect(() => {
        if (data && data[0]) {

            reset({
                Name: data[0].Name || "",
                Job: data[0].Job || "",
                Order: data[0]?.Order || '',

                shiftType: [],
                statusWorker: data[0]?.DayDataDetails?.map(i =>
                    i?.DayInfo?.SmenaDetails?.SmenaStatusWorker ||
                    i?.NightInfo?.SmenaDetails?.SmenaStatusWorker ||
                    i?.DayInfo?.statusTech ||
                    i?.DayInfo?.statusTech
                ) || [],
                note: data[0]?.DayDataDetails?.map(i => i?.DayInfo?.SmenaDetails?.Note || i?.NightInfo?.SmenaDetails?.Note || i?.DayInfo?.note || i?.NightInfo?.note
                ) || []
            })
        }
    }, [data, reset]);

    console.log(shiftType);

    const name = useWatch({ control, name: 'Name' });
    const order = useWatch({ control, name: 'Order' });
    const job = useWatch({ control, name: 'Job' });
    const amountData = useWatch({ control, name: 'AmountData' });
    const dayDataOstatkiPORT = useWatch({ control, name: 'DayDataOstatkiPORT' });
    const dayDataOstatkiGIR = useWatch({ control, name: 'DayDataOstatkiGIR' });
    const dayDataTonnaj = useWatch({ control, name: 'DayDataTonnaj' });
    const TC = useWatch({ control, name: 'TC' });
    const note = useWatch({ control, name: 'note' });
    const shiftTypeArray = useWatch({ control, name: 'shiftType' });

    const statusValues = useWatch({ control, name: 'statusWorker' });


    useEffect(() => {
        if (!shiftTypeArray) return;

        let newShiftType = [];
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


        // console.log('shiftTypeArray', shiftTypeArray);
        // console.log('newShiftType', newShiftType);


    }, [shiftTypeArray, setValue]);

    // console.log(shiftType);


    const [items, setItems] = useState([]);

    // console.log(items);


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
        let formData = {};
        let url = '';

        switch (forWhat) {
            case 'people':
                url = 'http://89.104.67.119:1337/api/people'
                formData = {

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
                    const currentDate = formattedDates[idx];
                    const isDuplicate = dublicateDates[currentDate] > 1;
                    const status = statusValues[idx] || data[0]?.DayDataDetails[idx]?.DayInfo?.SmenaDetails?.statusWorker || data[0]?.DayDataDetails[idx]?.DayInfo?.SmenaDetails?.statusWorker || 'Default';

                    const commonDetails = {
                        Note: note?.[idx] || "-",
                        SmenaDataTonnaj: dayDataTonnaj?.[idx] || data[0]?.DayDataDetails[idx]?.DayInfo?.SmenaDetails?.SmenaDataTonnaj || data[0]?.DayDataDetails[idx]?.NightInfo?.SmenaDetails?.SmenaDataTonnaj || "0",
                        SmenaDateDetails: currentDate || '0',
                        SmenaStatusWorker: status,
                        TC: TC?.[idx] || data[0]?.DayDataDetails[idx]?.DayInfo?.SmenaDetails?.TC || data[0]?.DayDataDetails[idx]?.NightInfo?.SmenaDetails?.TC || "-"
                    };

                    const existingEntry = acc.find(e =>
                        e.DayInfo?.SmenaDetails.SmenaDateDetails === currentDate ||
                        e.NightInfo?.SmenaDetails.SmenaDateDetails === currentDate
                    );

                    if (isDuplicate && existingEntry) {
                        if (shiftTypeArray[idx] === 'day') {
                            existingEntry.DayInfo = { Day: true, SmenaDetails: commonDetails };
                        } else {
                            existingEntry.NightInfo = { Night: true, SmenaDetails: commonDetails };
                        }
                    } else {
                        const shiftType = shiftTypeArray[idx] ? shiftTypeArray[idx] : 'day';
                        if (typeof shiftType === 'undefined') {
                            console.error('shiftType равен undefined для индекса', idx);
                            return acc;
                        } else {

                            acc.push({
                                ...(shiftType === 'day'
                                    ? { DayInfo: { Day: true, SmenaDetails: commonDetails } }
                                    : { NightInfo: { Night: true, SmenaDetails: commonDetails } }
                                )
                            }
                            )
                        }
                    }
                    return acc;
                }, []);

                break;

            case 'tech':
                url = 'http://89.104.67.119:1337/api/techicas'
                formData = {

                    uuid: objectUUID ? objectUUID : uuidv4(),
                    Name: name || "",
                    Order: order || data[0]?.Order,
                    objects: [
                        {
                            id: id,
                        }
                    ],
                };

                formData.DayDataDetails = items.reduce((acc, item, idx) => {
                    const currentDate = formattedDates[idx];
                    const isDuplicate = dublicateDates[currentDate] > 1;
                    const status = statusValues[idx] || 'In working';

                    const existingEntry = acc.find(e =>
                        e.DayInfo?.date === currentDate ||
                        e.NightInfo?.date === currentDate
                    );

                    if (isDuplicate && existingEntry) {
                        if (shiftTypeArray[idx] === 'day') {
                            existingEntry.DayInfo = { day: true, note: note?.[idx] || "-", date: currentDate || '0', statusTech: status, };
                        } else {
                            existingEntry.NightInfo = { night: true, note: note?.[idx] || "-", date: currentDate || '0', statusTech: status, };
                        }

                    } else {
                        const shiftType = shiftTypeArray[idx] ? shiftTypeArray[idx] : 'day';
                        if (typeof shiftType === 'undefined') {
                            console.error('shiftType равен undefined для индекса', idx);
                            return acc;
                        } else {

                            acc.push({
                                ...(shiftType === 'day'
                                    ? { DayInfo: { day: true, note: note?.[idx] || "-", date: currentDate || '0', statusTech: status } }
                                    : { NightInfo: { night: true, note: note?.[idx] || "-", date: currentDate || '0', statusTech: status } }
                                )
                            }
                            )
                        }
                    }
                    return acc;
                }, []);

                break;

            case 'drobilka':
                url = 'http://89.104.67.119:1337/api/drobilkas'

                formData = {

                    uuid: objectUUID ? objectUUID : uuidv4(),
                    Name: name || "",
                    objects: [
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
                    const currentDate = formattedDates[idx];
                    const isDuplicate = dublicateDates[currentDate] >= 1;
                    const status = statusValues[idx] || 'Default';

                    if (!currentDate) {
                        console.error(`Дата не найдена для индекса ${idx}`);
                        return acc;
                    }

                    const commonDetails = {
                        Note: note?.[idx] || "-",
                        SmenaDataTonnaj: dayDataTonnaj?.[idx] || "0",
                        SmenaDateDetails: currentDate,
                        SmenaStatusWorker: status,
                        TC: TC?.[idx] || "-"
                    };

                    const existingEntry = acc.find(e =>
                        e.DayInfo?.SmenaDetails.SmenaDateDetails === currentDate ||
                        e.NightInfo?.SmenaDetails.SmenaDateDetails === currentDate
                    );

                    if (isDuplicate && existingEntry) {
                        const shiftType = shiftTypeArray[idx];

                        if (shiftType === 'day' && !existingEntry.DayInfo) {
                            existingEntry.DayInfo = { Day: true, SmenaDetails: commonDetails };
                        }
                        else if (shiftType === 'night' && !existingEntry.NightInfo) {
                            existingEntry.NightInfo = { Night: true, SmenaDetails: commonDetails };
                        }

                    } else {
                        const shiftType = shiftTypeArray[idx] ? shiftTypeArray[idx] : 'day';
                        if (typeof shiftType === 'undefined') {
                            console.error('shiftType равен undefined для индекса', idx);
                            return acc;
                        } else {

                            acc.push({
                                ...(shiftType === 'day'
                                    ? { DayInfo: { Day: true, SmenaDetails: commonDetails } }
                                    : { NightInfo: { Night: true, SmenaDetails: commonDetails } }
                                )
                            }
                            )
                        }
                    }
                    return acc;
                }, []);
        }

        try {
            const existingRecordId = await checkExistingRecord(objectUUID, url);
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
                        errors={errors}
                        shiftType={shiftType}
                        setItems={setItems}
                        popupId={popupId}
                    />
                )}
            </div>
        </form>
    )
}