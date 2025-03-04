import styles from './style.module.scss';
import { useState } from 'react';

export default function ChooseTimeBtn({ onClick }) {
    const [active, setActive] = useState(null); 

    const handleButtonClick = (time) => {
        setActive(time); 
        if (onClick) {
            onClick(time); 
        }
    };

    return (
        <>
            <button 
                id='moon' 
                className={`${active === 'day' ? styles.active : ''} ${styles.smena_btn} ${styles.day}`}
                onClick={() => handleButtonClick('day')} 
            >
                <p>День</p>
            </button>

            <button 
                id='sun' 
                className={`${active === 'night' ? styles.active : ''} ${styles.smena_btn} ${styles.night}`}
                onClick={() => handleButtonClick('night')} 
            >
                <p>Ночь</p>
            </button>
        </>
    );
}

