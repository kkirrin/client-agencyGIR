import styles from './style.module.scss';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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

    const onSubmit = async (formData) => {
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