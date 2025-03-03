import styles from './style.module.scss';


export default function CustomCheckBox({ label, checkboxId,labelHtmlFor }) {
    return (
        <div className={styles.item}>
            <input type="checkbox" id={checkboxId} />
            <label htmlFor={checkboxId}>
                {label}
            </label>
        </div>
    )
}