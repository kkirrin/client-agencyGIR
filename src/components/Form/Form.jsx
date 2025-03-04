import styles from './style.module.scss';
import { useState } from 'react';

import { 
    BtnSave, 
    ComponentDrobilka,
    ComponentTech,
    ComponentPeople
}
    from '../../components';



export default function Form({ title, forWhat }) {

    const [items, setItems] = useState([1]);

    const handleClick = () => {
        setItems([...items, { id: items.length + 1 }]); 
    };

    const handleTimeChange = (time) => {
        console.log('Selected time:', time);
    };
    
    return (
        <form
            action=""
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
                            <BtnSave />
                        </div>
                    </div>
                </div>

                
                {forWhat === 'people' && (
                    <ComponentPeople
                        handleClickBtn={handleClick}
                        handleTimeChange={handleTimeChange}
                        items={items}
                    />
                )}

                {forWhat === 'tech' && (
                    <ComponentTech
                        handleClickBtn={handleClick}
                        handleTimeChange={handleTimeChange}
                        items={items}
                    />
                )}
            
                {forWhat === 'drobilka' && (
                    <ComponentDrobilka
                        handleClickBtn={handleClick}
                        handleTimeChange={handleTimeChange}
                        items={items}
                    />
                )}
            </div>
        </form>
    )
}