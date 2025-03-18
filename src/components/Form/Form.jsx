import styles from './style.module.scss';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useDateStore from '../../store/CalendarStore';

import { 
    BtnSave, 
    ComponentDrobilka,
    ComponentTech,
    ComponentPeople
}
    from '../../components';

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
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [items, setItems] = useState([1]); 

    const handleClick = () => {
        setItems([...items, items.length + 1]); 
    };

    const { dates } = useDateStore();

    const onSubmit = async (formData) => {

        formData.MonthDataTonnaj = [
            {
                "AmountData": "100 000 000",
                "MonthData": "2025-03-01",
                "id": 5,
            }
        ]

        formData.DayDataDetails = [
            {
                "DayInfo": {
                    "Day": true,
                    "SmenaDetails": {
                        "SmenaDetails": {
                            "Note": "Какое-то примечание",
                            "SmenaDataTonnaj": "50 000",
                            "SmenaDateDetails": "2025-03-11",
                            "SmenaStatusWorker": "Empty",
                            "TC": "Какое-то тс",
                            "id": 6,
                        },
                        "Smena": "test",
                        "SmenaId": 1
                    }
                }
            },

            {
                "NightInfo": {
                    "Day": false,
                    "SmenaDetails": {
                        "SmenaDetails": {
                            "Note": "Какое-то примечание",
                            "SmenaDataTonnaj": "50 000",
                            "SmenaDateDetails": "2025-03-11",
                            "SmenaStatusWorker": "Empty",
                            "TC": "Какое-то тс",
                            "id": 6
                        },
                        "Smena": "test",
                        "SmenaId": 1
                    }
                }
            },
        ]

        formData.DayDataOstatki = [
            {
                "DayDataOstatki": "2025-03-02",
                "DayDataOstatkiGIR": "100 000",
                "DayDataOstatkiPORT": "100 000",
            }
        ]

        

    /**
     * 
     *  Object { id: 12, documentId: "pr3xsktx31qctirljpyfh0oe", Name: "Иван Иванов", createdAt: "2025-03-14T06:32:47.888Z", updatedAt: "2025-03-18T02:05:32.989Z", publishedAt: "2025-03-18T02:05:33.046Z", Job: "Инженер", DayDataDetails: (2) […
            DayDataDetails: Array [ {…}, {…} ]
            0: Object { id: 7, DayInfo: {…}, NightInfo: {…} }
            DayInfo: Object { id: 4, Day: true, SmenaDetails: {…} }
            Day: true
            SmenaDetails: Object { id: 6, SmenaStatusWorker: "Empty", SmenaDataTonnaj: "50 000", … }
            Note: "Какое-то примечание"
            SmenaDataTonnaj: "50 000"
            SmenaDateDetails: "2025-03-11"
            SmenaStatusWorker: "Empty"
            TC: "Какое-то тс"
            id: 6
            id: 4
            NightInfo: Object { id: 4, Night: false, SmenaDetails: {…} }
            id: 7
            <prototype>: Object { … 
            1: Object { id: 6, DayInfo: null, NightInfo: null 
            length: 
            <prototype>: Array 
            Job: "Инжене
            Name: "Иван Иванов"
            createdAt: "2025-03-14T06:32:47.888Z"
            documentId: "pr3xsktx31qctirljpyfh0oe"
            id: 12
            publishedAt: "2025-03-18T02:05:33.046Z"
            updatedAt: "2025-03-18T02:05:32.989Z"z
     * 
     */
      

        console.log(formData);

        setIsSending(true);
        setError(null);

    try {
        const { response, data } = await saveUserDateService(formData);
    if (response.ok) {
        console.log('Успешная отправка:', data);
        reset(); // Очищаем форму после успешной отправки
        setItems([1]); // Сбрасываем список items
    } else {
        setError('Ошибка');
    }
    } catch (error) {
        setError('Ошибка запроса, попробуйте позже');
    } finally {
        setIsSending(false);
    }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
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