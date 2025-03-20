import styles from './style.module.scss';

export default function CustomCheckBox({ label, checkboxId, labelHtmlFor, register, errors, type, name, value }) {
    return (
        <div className={styles.item}>
            <input 
                name={name}
                type={type} 
                id={checkboxId}
                value={value}
                {...register(name)} // Регистрируем чекбокс
            />
            <label htmlFor={checkboxId}>
                {label}
            </label>
        </div>
    );
}