import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import styles from './style.module.scss';
import { updateDataTonnajService } from '../../services/update-object-service';
import useDataObjectRequestStore from '../../store/DataObjectRequestStore';
import { format } from 'date-fns';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);


import { useParams } from 'react-router-dom';
import {
    BtnSave,
    ComponentTonnajMini,
    DeleteButton,
    ModalNotification,
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

export default function MiniForm({ title, forWhat, setActive, popupId }) {

    const { id } = useParams();
    const [error, setError] = useState();
    const { dates } = useDateSingleStore();
    const [formValues, setFormValues] = useState({});
    const [isSending, setIsSending] = useState(false);
    const { dataObject } = useDataObjectRequestStore();
    const [datesFromData, setDatesFromData] = useState([]);
    const [modalNotification, setModalNotification] = useState(false);
    const [modalNotificationText, setModalNotificationText] = useState(false);

    console.log(dataObject)

    // let currentMonthYear = format(new Date(), 'MM.yyyy', { locale: ru });

    const { register, control, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset, setValue } = useForm();

    // Правильное определение формата


    const amountDataObject = useWatch({ control, name: 'AmountDataObject' });
    const dayDataObjectOstatkiPORT = useWatch({ control, name: 'DayDataObjectOstatkiPORT' });
    const dayDataObjectOstatkiGIR = useWatch({ control, name: 'DayDataObjectOstatkiGIR' });

    const objectUUID = dataObject[0]?.documentId

    useEffect(() => {
        if (dataObject && dataObject[0]) {
            const newFormDefault = {
                Name: dataObject[0].Name || "",
                
                MonthDataTonnaj: dataObject[0]?.MonthDataObjectTonnaj
                    ?.map(m => {
                        if (m && m.MonthDataObject !== '0' && m.MonthDataObject !== undefined && m.MonthData !== null) {
                            const [day, month, year] = m.MonthDataObject.split('.').map(Number);
                            const dateObj = new Date(year, month - 1, day);
                            const itemDate = format(dateObj, 'dd.MM.yyyy', { locale: ru });
                            if (itemDate) {
                                return {
                                    ...m,
                                    MonthDataObject: m.MonthDataObject
                                };
                            }
                        } else {
                            console.log(false)
                        }
                        return null;
                    })
                    ?.filter(Boolean) || [],
                 workers: dataObject[0]?.workers
            }

            reset(newFormDefault);
            setFormValues(newFormDefault);

        }
    }, [dataObject, reset]);    



    const onSubmit = async () => {
        setIsSending(true);
        setError(null);
        let formData = {};
        let url = '';
        try {

            url = 'http://89.104.67.119:1337/api/objects'

            formData = {
                MonthDataObjectTonnaj:
                
                [{
                    MonthDataObject: format(new Date(), 'dd.MM.yyyy', {locale: ru}),
                    AmountDataObject: amountDataObject ?? '0',
                    DayDataObjectOstatkiPORT: dayDataObjectOstatkiPORT ?? '0',
                    DayDataObjectOstatkiGIR: dayDataObjectOstatkiGIR ?? '0',             
                }],
            };


            try {
                let response;
                response = await updateDataTonnajService(
                    objectUUID,
                    formData,
                    url
                );
                if (response.status === 200) {
                    setModalNotification(true);
                    setModalNotificationText('Форма отправлена ✅ Данные обновлены');
                    reset();
                }
                console.log('Данные обновлены:', formData);

            } catch (error) {
                console.error(error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form_wrapper}>
                    <div className={styles.form_header}>
                        <div>
                            <h2 className={styles.form_title}>
                                {/* {title} */}
                            </h2>
                        </div>

                        <div className={styles.form_title_info}>
                            <div className={styles.btn_save_wrapper}>
                                <BtnSave isSending={isSending} />
                                <DeleteButton setActive={setActive} />
                            </div>
                        </div>
                    </div>

                    <ComponentTonnajMini
                        data={dataObject}
                        errors={errors}
                        register={register}
                    />
                    
                </div>
            </form>
            
            <ModalNotification active={modalNotification} text={modalNotificationText} /> 
        </>
    )
}