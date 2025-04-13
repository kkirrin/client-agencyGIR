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
    const [items, setItems] = useState([]);
    const [formValues, setFormValues] = useState({});

    const { register, control, handleSubmit, formState: { errors }, reset, setValue } = useForm();

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
        ...Object.values(dates).filter(date => date instanceof Date && !isNaN(date)).map(date =>date.toLocaleDateString(formatOptions.locale,formatOptions.options))
        ];
        
    return allDates;
    })();



    useEffect(() => {
        if (data && data[0]) {
            const newFormDefault = {
                Name: data[0].Name || "",
                Job: data[0].Job || "",
                Order: data[0]?.Order || '',
                shiftType: [],
                statusWorker: data[0]?.DayDataDetails?.flatMap(i => {
                    const result = [];
                    if (i?.DayInfo) {
                        result.push(
                            i.DayInfo?.SmenaDetails?.SmenaStatusWorker ||
                            i.DayInfo?.statusTech ||
                            ""
                        );
                    }
                    if (i?.NightInfo) {
                        result.push(
                            i.NightInfo?.SmenaDetails?.SmenaStatusWorker || 
                            i.NightInfo?.statusTech ||
                            ""
                        );
                    }
                    return result;
                }) || [],

                smenaDateDetails: data[0]?.DayDataDetails?.flatMap(i => {
                    const result = [];
                    if (i?.DayInfo) {
                        result.push(
                            i.DayInfo?.SmenaDetails?.SmenaDateDetails || "0"
                        );
                    }
                    if (i?.NightInfo) {
                        result.push(
                            i.NightInfo?.SmenaDetails?.SmenaDateDetails || "0"
                        );
                    }
                    return result;
                }) || [],

                shiftTypeArray: data[0]?.DayDataDetails?.flatMap(i => {
                    const res = [];
                    if (i?.DayInfo) res.push("day");
                    if (i?.NightInfo) res.push("night");
                    return res;
                }) || [],


                dayDataTonnaj: data[0]?.DayDataDetails?.flatMap(i => {
                    const result = [];
                    if (i?.DayInfo) {
                        result.push(
                            i.DayInfo?.SmenaDetails?.SmenaDataTonnaj || "0"
                        );
                    }
                    if (i?.NightInfo) {
                        result.push(
                            i.NightInfo?.SmenaDetails?.SmenaDataTonnaj || "0"
                        );
                    }
                    return result;
                }) || [],

                TC: data[0]?.DayDataDetails?.flatMap(i => {
                    const result = [];
                    if (i?.DayInfo) result.push(i.DayInfo?.SmenaDetails?.TC)
                    if (i?.NightInfo) result.push(i.NightInfo?.SmenaDetails?.TC);
                    return result;
                }) || [],
                
                note: data[0]?.DayDataDetails?.map(i => 
                    i?.DayInfo?.SmenaDetails?.Note || 
                    i?.NightInfo?.SmenaDetails?.Note || 
                    i?.DayInfo?.note || 
                    i?.NightInfo?.note) || []
                };

            reset(newFormDefault);
            setFormValues(newFormDefault);
            console.log("Инициализация формы:", newFormDefault.shiftTypeArray);

        }
        }, [data, reset]);

    console.log('formValues!!!!', formValues.shiftTypeArray);
    
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

    // console.log('Это данные которые лежат в dayDataTonnaj (они будут заполняться при измении одного из полей, изначально они undefiend): ', dayDataTonnaj);

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

    }, [shiftTypeArray, setValue]);

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
    

    // console.log('ХОЧУ распечать содержмимое каждой смены и проверить что лежит в SmenaDateDetails до отправки (не будет меняться при измении полей в форме)', data[0]?.DayDataDetails?.map(i => 
    //     i?.DayInfo?.SmenaDetails?.SmenaDateDetails || i?.NightInfo?.SmenaDetails?.SmenaDateDetails || "нихера там не лежит а должно ли???"
    // ));

    const dublicateDates = formattedDates.reduce((acc, d) => {
        acc[d] = (acc[d] || 0) + 1;
        return acc;
    }, {})

    const onSubmit = async () => {
        setIsSending(true);
        setError(null);
        let formData = {};
        let url = '';

        console.log('items !!!', items)
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
                    const isDuplicate = dublicateDates[currentDate] >= 1;
                    const status = statusValues[idx] || 'Default';
                
                    if (!currentDate) {
                        console.error(`Дата не найдена для индекса ${idx}`);
                        return acc;
                    }
                
                    const commonDetails = {
                        Note: note?.[idx] || formValues?.note[idx],
                        SmenaDataTonnaj: dayDataTonnaj?.[idx] || formValues?.dayDataTonnaj[idx] || "При отправке не нашел ни записанного, ни default",
                        SmenaDateDetails: currentDate || formValues.smenaDateDetails[idx],
                        SmenaStatusWorker: status,
                        TC: TC?.[idx] || formValues?.TC[idx] || "При отправке не нашел ни записанного, ни default"
                    };
                
                    const existingEntry = acc.find(e => {
                        console.log('existingEntry e', e);
                        return (
                            e.DayInfo?.SmenaDetails?.SmenaDateDetails === currentDate ||
                            e.NightInfo?.SmenaDetails?.SmenaDateDetails === currentDate
                        );
                    });
                
                    if (isDuplicate && existingEntry) {
                        console.log('Когда я отправляю первый раз - все работает, тут лежит два правильных объекта', existingEntry);
                        const shiftType = shiftTypeArray[idx] || formValues.shiftTypeArray[idx];
                        
                        if (shiftType === 'day') {
                            console.log('day')

                            existingEntry.DayInfo = { 
                                ...existingEntry.DayInfo,
                                Day: true, 
                                SmenaDetails: {
                                    ...existingEntry.DayInfo?.SmenaDetails,
                                    ...commonDetails
                                } 
                            };
                        } else if (shiftType === 'night') {
                            console.log('night')
                            existingEntry.NightInfo = { 
                                ...existingEntry.NightInfo,
                                Night: true, 
                                SmenaDetails: {
                                    ...existingEntry.NightInfo?.SmenaDetails,
                                    ...commonDetails
                                } 
                            };
                        } else {
                            console.log('Пошел нахуй')
                        }
                    } else {
                        const shiftType = shiftTypeArray[idx] || 'day';
                        acc.push({
                            ...(shiftType === 'day'
                                ? { DayInfo: { Day: true, SmenaDetails: commonDetails } }
                                : { NightInfo: { Night: true, SmenaDetails: commonDetails } }
                            )
                        });
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
                    
                    console.log(statusValues[idx]);

                    const existingEntry = acc.find(e =>
                        e.DayInfo?.date === currentDate ||
                        e.NightInfo?.date === currentDate
                    );

                    if (isDuplicate && existingEntry) {
                        if (shiftTypeArray[idx] === 'day') {
                            existingEntry.DayInfo = { day: true,  note: note?.[idx] || "-", date: currentDate || '0', statusTech: status, };
                        } else {
                            existingEntry.NightInfo = { night: true,  note: note?.[idx] || "-", date: currentDate || '0', statusTech: status, };
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
                        Note: note?.[idx] || formValues?.note[idx],
                        SmenaDataTonnaj: dayDataTonnaj?.[idx] || formValues?.dayDataTonnaj[idx] || "При отправке не нашел ни записанного, ни default",
                        SmenaDateDetails: currentDate || formValues.smenaDateDetails[idx],
                        SmenaStatusWorker: status,
                        TC: TC?.[idx] || formValues?.TC[idx] || "При отправке не нашел ни записанного, ни default"
                    };
                
                    const existingEntry = acc.find(e => {
                        console.log('existingEntry e', e);
                        return (
                            e.DayInfo?.SmenaDetails?.SmenaDateDetails === currentDate ||
                            e.NightInfo?.SmenaDetails?.SmenaDateDetails === currentDate
                        );
                    });
                
                    if (isDuplicate && existingEntry) {
                        console.log('Когда я отправляю первый раз - все работает, тут лежит два правильных объекта', existingEntry);
                        const shiftType = shiftTypeArray[idx] || formValues.shiftTypeArray[idx];
                        
                        if (shiftType === 'day') {
                            console.log('day')

                            existingEntry.DayInfo = { 
                                ...existingEntry.DayInfo,
                                Day: true, 
                                SmenaDetails: {
                                    ...existingEntry.DayInfo?.SmenaDetails,
                                    ...commonDetails
                                } 
                            };
                        } else if (shiftType === 'night') {
                            console.log('night')
                            existingEntry.NightInfo = { 
                                ...existingEntry.NightInfo,
                                Night: true, 
                                SmenaDetails: {
                                    ...existingEntry.NightInfo?.SmenaDetails,
                                    ...commonDetails
                                } 
                            };
                        } else {
                            console.log('Пошел нахуй')
                        }
                    } else {
                        const shiftType = shiftTypeArray[idx] || 'day';
                        acc.push({
                            ...(shiftType === 'day'
                                ? { DayInfo: { Day: true, SmenaDetails: commonDetails } }
                                : { NightInfo: { Night: true, SmenaDetails: commonDetails } }
                            )
                        });
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