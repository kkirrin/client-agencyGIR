import styles from './style.module.scss';


export default function CustomCheckBox({ label, checkboxId,labelHtmlFor, register, errors, type, name }) {
    return (
        <div className={styles.item}>
            <input 
                name={name}
                type={type} 
                id={checkboxId}
            />
            <label htmlFor={checkboxId}>
                {label}
            </label>
        </div>
    )
}