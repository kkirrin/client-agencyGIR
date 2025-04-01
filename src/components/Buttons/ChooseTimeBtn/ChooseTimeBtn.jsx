import styles from './style.module.scss';
import { useForm, Controller } from 'react-hook-form';


export default function ChooseTimeBtn({ register, idx, shiftType }) {
    /**
     * TODO: сделать дефолное значение для радио кнопок
     * удаление смены
     * 
     */
    console.log(shiftType);

    return (
        <>
            <input
                type="radio"
                id="day"
                value="day"
                {...register('shiftType')}
                className={styles.hidden}
            />
            <label
                htmlFor={'day'}
                className={`${styles.smena_btn} ${styles.day} ${shiftType === 'day' ? `${styles.active_white}` : ''}`}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.404 4.11101C3.5995 4.30651 3.916 4.30651 4.11098 4.11101C4.30599 3.9155 4.30599 3.59901 4.11098 3.40403L3.05051 2.34301C2.85501 2.1475 2.53851 2.1475 2.3435 2.34301C2.148 2.53851 2.148 2.85501 2.3435 3.05001L3.404 4.11101ZM3.70499 11.595L2.65448 12.6455C2.46099 12.839 2.46099 13.1525 2.65448 13.346C2.84797 13.5395 3.16149 13.5395 3.35498 13.346L4.40549 12.2955C4.59898 12.102 4.59898 11.7885 4.40549 11.595C4.212 11.4015 3.89851 11.4015 3.70499 11.595ZM8 2.5C8.276 2.5 8.5 2.276 8.5 2V0.5C8.5 0.224 8.276 0 8 0C7.724 0 7.5 0.224 7.5 0.5V2C7.5 2.276 7.724 2.5 8 2.5ZM12.8105 3.88999L13.861 2.83948C14.0545 2.64599 14.0545 2.33247 13.861 2.13898C13.6675 1.94549 13.354 1.94549 13.1605 2.13898L12.11 3.18949C11.9165 3.38298 11.9165 3.6965 12.11 3.88999C12.3035 4.0835 12.617 4.0835 12.8105 3.88999ZM2 7.5H0.5C0.224 7.5 0 7.724 0 8C0 8.276 0.224 8.5 0.5 8.5H2C2.276 8.5 2.5 8.276 2.5 8C2.5 7.724 2.276 7.5 2 7.5ZM8 13.5C7.724 13.5 7.5 13.724 7.5 14V15.5C7.5 15.776 7.724 16 8 16C8.276 16 8.5 15.776 8.5 15.5V14C8.5 13.724 8.276 13.5 8 13.5ZM15.5 7.5H14C13.724 7.5 13.5 7.724 13.5 8C13.5 8.276 13.724 8.5 14 8.5H15.5C15.776 8.5 16 8.276 16 8C16 7.724 15.776 7.5 15.5 7.5ZM12.596 11.889C12.4005 11.6935 12.084 11.6935 11.889 11.889C11.6935 12.0845 11.6935 12.401 11.889 12.596L12.9495 13.6565C13.145 13.852 13.4615 13.852 13.6565 13.6565C13.8515 13.461 13.852 13.1445 13.6565 12.9495L12.596 11.889ZM8 3.49699C5.51299 3.49699 3.49699 5.51299 3.49699 8C3.49699 10.487 5.51299 12.503 8 12.503C10.487 12.503 12.503 10.487 12.503 8C12.503 5.51299 10.487 3.49699 8 3.49699Z" fill="#F2B174" />
                </svg>
                <p>День</p>
            </label >

            <input
                type="radio"
                id="night"
                value="night"
                {...register('shiftType')} // Общее имя для группы
                className={styles.hidden}
            />
            <label
                htmlFor={'night'}
                className={`${styles.smena_btn} ${styles.night} ${shiftType === 'night' ? `${styles.active_black}` : ''}`}
            >
                <p>Ночь</p>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.8949 8.95502C13.8238 8.88361 13.7327 8.83538 13.6336 8.81664C13.5346 8.7979 13.4322 8.80954 13.3399 8.85002C12.2016 9.34634 10.9403 9.48825 9.7202 9.25727C8.50012 9.02628 7.37792 8.4331 6.49986 7.55505C5.62181 6.677 5.02863 5.5548 4.79765 4.33472C4.56666 3.11464 4.70857 1.85327 5.2049 0.715016C5.24596 0.622658 5.25806 0.520024 5.23961 0.420648C5.22117 0.321271 5.17303 0.229819 5.10156 0.158349C5.03009 0.0868786 4.93864 0.038747 4.83927 0.0203001C4.73989 0.00185318 4.63726 0.0139572 4.5449 0.0550163C3.47529 0.523884 2.5363 1.24675 1.80946 2.16086C1.08262 3.07497 0.589895 4.15268 0.374073 5.30042C0.15825 6.44817 0.225852 7.63124 0.57101 8.74693C0.916167 9.86262 1.52845 10.8772 2.35468 11.7026C3.18092 12.5279 4.19614 13.1391 5.31219 13.4831C6.42824 13.8271 7.61139 13.8934 8.7589 13.6764C9.90642 13.4594 10.9836 12.9655 11.8969 12.2377C12.8103 11.5099 13.5322 10.5701 13.9999 9.50002C14.0382 9.40896 14.0486 9.3086 14.03 9.21161C14.0113 9.11462 13.9643 9.02533 13.8949 8.95502Z" fill="#1F2433" />
                </svg>
            </label >
        </>
    );
}