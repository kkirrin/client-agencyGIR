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
import useDateSingeStore from '../../store/CalendarSingleStore';

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

export default function Form({ title, forWhat, setActive }) {
    const [error, setError] = useState();
    const [isSending, setIsSending] = useState(false);
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();


    const { date } = useDateSingeStore();
    const { id } = useParams();
    const { data } = useDataRequestStore();

    /**
     * Отслеживать input value принято при помощи useWatch && control
    */

    const formattedDate = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    useEffect(() => {
        reset({
            Name: data.name,
            Job: data.job,
            // AmountData: data?.MonthDataTonnaj[0]?.AmountData,
            // DayDataOstatkiPORT: data.DayDataOstatki[0]?.DayDataOstatkiPORT,
            // DayDataOstatkiGIR: data.DayDataOstatki[0]?.DayDataOstatkiGIR,
            // DayDataTonnaj: data?.MonthDataTonnaj[0]?.MonthData,
            // TC: data?.DayDataDetails[0]?.SmenaDetails?.TC,
            // note: data?.DayDataDetails[0]?.SmenaDetails?.Note,
            // btnDay: data,
            // btnNight: data,
            // statusWorkerNotWorked: data,
            // statusWorkerDayOff: data,
            // statusWorkerEmpty: data,

        });
    }, []);

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

    const statusWorkerNotWorked = useWatch({ control, name: 'statusWorkerNotWorked' });
    const statusWorkerDayOff = useWatch({ control, name: 'statusWorkerDayOff' });
    const statusWorkerEmpty = useWatch({ control, name: 'statusWorkerEmpty' });


    // Следим за изменением значений
    const shiftType = useWatch({ control, name: 'shiftType' });

    useEffect(() => {
        if (shiftType === 'day') {
            setValue('btnNight', false);
        } else if (shiftType === 'night') {
            setValue('btnDay', false);
        }
    }, [shiftType, setValue]);


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
                    MonthData: formattedDate || '0',
                },
            ],
            DayDataOstatki: [
                {
                    DayDataOstatki: formattedDate || '0',
                    DayDataOstatkiGIR: dayDataOstatkiGIR || "0",
                    DayDataOstatkiPORT: dayDataOstatkiPORT || "0",
                },
            ],
        };

        if (shiftType == "day") {
            formData.DayDataDetails = [
                {
                    DayInfo: {
                        Day: true,
                        SmenaDetails: {
                            Note: note || "-",
                            SmenaDataTonnaj: dayDataTonnaj || "0",
                            SmenaDateDetails: formattedDate || '0',
                            SmenaStatusWorker: statusWorkerNotWorked || statusWorkerDayOff || statusWorkerEmpty || "Default",
                            TC: TC || "-",
                        },
                    },
                },
            ];

        } else if (shiftType == "night") {
            formData.DayDataDetails = [
                {
                    NightInfo: {
                        Night: true,
                        SmenaDetails: {
                            Note: note || "-",
                            SmenaDataTonnaj: dayDataTonnaj || "0",
                            SmenaDateDetails: formattedDate || '0',
                            SmenaStatusWorker: statusWorkerNotWorked || statusWorkerDayOff || statusWorkerEmpty || "Default",
                            TC: TC || "-",
                        },
                    },
                },
            ];
        }

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
                    />
                )}

                {forWhat === 'tech' && (
                    <ComponentTech
                        handleClickBtn={handleClick}
                        items={items}
                        register={register}
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