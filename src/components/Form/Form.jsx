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

const url = 'http://89.104.67.119:1337/api/people/';

export async function saveUserDateService(userData) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: {...userData} }),
    });

    const data = await response.json();
    return { response, data };
}



export default function Form({ title, forWhat }) {
    const [error, setError] = useState();
    const [isSending, setIsSending] = useState(false);
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm();
    const { date } = useDateSingeStore();

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
    const dayDataOstatkiGIR  = useWatch({ control, name: 'DayDataOstatkiGIR' });
    const smenaStatusWorker = useWatch({ control, name: 'SmenaStatusWorker' });
    const dayDataTonnaj = useWatch({ control, name: 'DayDataTonnaj' });
    const TC = useWatch({ control, name: 'TC' });
    const note = useWatch({ control, name: 'note' });



    const [items, setItems] = useState([1]); 

    const handleClick = () => {
        setItems([...items, items.length + 1]); 
    };


    const onSubmit = async () => {
        setIsSending(true);
        setError(null);

        const formData = {
            uuid: uuidv4(),
            Name: name || "",
            Job: job || "",
            MonthDataTonnaj: [
                {
                    AmountData: amountData || "0", 
                    MonthData: formattedDate || '0',
                },
            ],
            DayDataDetails: [
                {
                    DayInfo: {
                        Day: true,
                        SmenaDetails: {
                            Note: note || "-", 
                            SmenaDataTonnaj: dayDataTonnaj || "0", 
                            SmenaDateDetails: formattedDate || '0',

                            SmenaStatusWorker: smenaStatusWorker || "Not working", 
                            TC: TC || "-",
                        },
                    },
                },
                {
                    NightInfo: {
                        Night: false,
                        SmenaDetails: {
                            Note: "-",
                            SmenaDataTonnaj: "-",
                            SmenaDateDetails: "-",
                            SmenaStatusWorker: "Not working",
                            TC: "-",
                        },
                    },
                },
            ],
            DayDataOstatki: [
                {
                    DayDataOstatki: formattedDate || '0',
                    DayDataOstatkiGIR: dayDataOstatkiGIR  || "0", 
                    DayDataOstatkiPORT: dayDataOstatkiPORT || "0", 
                },
            ],
        };

        console.log('Должна быть новая formData', formData);

        try {
            const { response, data } = await saveUserDateService(formData);
            if (response.ok) {
                console.log('Успешная отправка:', data);
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
                            <BtnSave isSending={isSending}/>
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