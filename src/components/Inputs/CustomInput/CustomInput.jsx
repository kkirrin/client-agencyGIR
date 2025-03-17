import styles from './style.module.scss';
import { useForm } from 'react-hook-form';

export default function CustomInput({ placeholder, type, id, register, errors, name }) {
    
    return (
        <input
            id={id}
            className={styles.custom_input}
            type={type}
            placeholder={placeholder}
            {...register(`${name}`, { required: { value: true, message: `${placeholder}` } })} error={errors.name}
        />
    )
}