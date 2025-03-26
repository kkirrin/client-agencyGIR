import styles from './style.module.scss';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import {
    BtnSave,
    ComponentDrobilka,
    ComponentTech,
    ComponentPeople
}
    from '../../components';
import useDateSingeStore from '../../store/CalendarSingleStore';
import { useParams } from 'react-router-dom';

const url = 'http://89.104.67.119:1337/api/people/';

export async function saveUserDateService(userData) {
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

export async function updateUserDataService(userData) {

    const response = await fetch(url, {
        method: 'UPDATE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { ...userData } }),
    });

    const data = await response.json();
    return { response, data };
}



export default function Form({ title, forWhat }) {

    const [error, setError] = useState();
    const [isSending, setIsSending] = useState(false);
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm();
    const { date } = useDateSingeStore();

    const { id } = useParams();
    console.log(id);

    /**
     * Отслеживать input value принято при помощи useWatch && control
    */


    const formattedDate = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const name = useWatch({ control, name: 'Name' });
    const job = useWatch({ control, name: 'Job' });
    const amountData = useWatch({ control, name: 'AmountData' });
    const dayDataOstatkiPORT = useWatch({ control, name: 'DayDataOstatkiPORT' });
    const dayDataOstatkiGIR = useWatch({ control, name: 'DayDataOstatkiGIR' });
    const dayDataTonnaj = useWatch({ control, name: 'DayDataTonnaj' });
    const TC = useWatch({ control, name: 'TC' });
    const note = useWatch({ control, name: 'note' });
    const btnDay = useWatch({ control, name: 'btnDay' });
    const btnNight = useWatch({ control, name: 'btnNight' });

    const statusWorkerNotWorked = useWatch({ control, name: 'statusWorkerNotWorked' });
    const statusWorkerDayOff = useWatch({ control, name: 'statusWorkerDayOff' });
    const statusWorkerEmpty = useWatch({ control, name: 'statusWorkerEmpty' });

    const [items, setItems] = useState([1]);

    // console.log(statusWorkerNotWorked, statusWorkerDayOff, statusWorkerEmpty)

    const handleClick = (e) => {
        e.preventDefault();
        setItems([...items, items.length + 1]);
    };


    const onSubmit = async () => {
        setIsSending(true);
        setError(null);

        
        const formData = {
            
            uuid: uuidv4(),
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

        if (btnDay) {
            formData.DayDataDetails = [
                {
                    DayInfo: {
                        Day: true,
                        SmenaDetails: {
                            Note: note || "-",
                            SmenaDataTonnaj: dayDataTonnaj || "0",
                            SmenaDateDetails: formattedDate || '0',
                            SmenaStatusWorker: statusWorkerNotWorked || statusWorkerDayOff || statusWorkerEmpty || "Not working",
                            TC: TC || "-",
                        },
                    },
                },
            ];
        }

        if (btnNight) {
            if (!formData.DayDataDetails) {
                formData.DayDataDetails = [];
            }
            formData.DayDataDetails.push({
                NightInfo: {
                    Night: true,
                    SmenaDetails: {
                        Note: note || "-",
                        SmenaDataTonnaj: dayDataTonnaj || "0",
                        SmenaDateDetails: formattedDate || '0',
                        SmenaStatusWorker: statusWorkerNotWorked || statusWorkerDayOff || statusWorkerEmpty || "Not working",
                        TC: TC || "-",
                    },
                },
            });
        }

        try {
            const { response } = await saveUserDateService(formData);
            if (response.ok) {
                console.log('Успешная отправка:', formData);
                reset({
                    AmountData: "",
                    DayDataOstatkiPORT: "",
                    DayDataOstatkiGIR: "",
                    SmenaStatusWorker: "",
                    DayDataTonnaj: "",
                    TC: "",
                    note: "",
                    job: "",
                    name: "",
                    btnDay: false, // Сбрасываем значения
                    btnNight: false, // Сбрасываем значения
                });
                
                
                setItems([1]);
            } else {
                setError('Ошибка при отправке данных');
            }
        } catch (error) {
            setError('Ошибка запроса, попробуйте позже');
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
                        </div>
                    </div>
                </div>

                {forWhat === 'people' && (
                    <ComponentPeople
                        handleClickBtn={handleClick}
                        items={items}
                        register={register}
                        errors={errors}
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