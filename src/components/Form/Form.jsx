import styles from './style.module.scss';
import { useState } from 'react';

import { 
    AddMoreBtn, 
    BtnSave, 
    ComponentDrobilka,
    ComponentTech,
    ComponentPeople
}
    from '../../components';

export default function Form({ title, forWhat }) {

    const [items, setItems] = useState([]);

    const handleClick = () => {
        setItems([...items, { id: items.length + 1, name: 'Test'}]);
    }

    return (
        <form
            action=""
        >
            {
                items.length > 0 && (

                    items.map((item, i) => {
                        return (
                            <div className={styles.form_wrapper} key={i}>
                                {item}
                            </div>

                        )
                    })
                )
            }

            {items.length === 0 && (
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
                        />
                    )}

                    {forWhat === 'tech' && (
                        <ComponentTech 
                            handleClickBtn={handleClick}
                        />
                    )}
                
                    {forWhat === 'drobilka' && (
                        <ComponentDrobilka 
                            handleClickBtn={handleClick}
                        />
                    )}
                </div>
            )}
        </form>
    )
}