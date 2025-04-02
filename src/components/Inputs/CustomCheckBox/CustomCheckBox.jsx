import styles from './style.module.scss';

export default function CustomCheckBox({ label, checkboxId, labelHtmlFor, register, errors, type, name, value, idx }) {
    return (
        <div className={styles.item}>
            <input 
                name={name}
                type={type} 
                id={checkboxId}
                value={value}
                {...(
                    typeof idx !== 'undefined' 
                        ? register(`${name}`, {
                            validate: v => v?.toString().trim() !== '' || 'Поле не может быть пустым'
                        })
                        : register(name)
                )}// Регистрируем чекбокс
            />
            <label htmlFor={checkboxId}>
                {label}
            </label>
        </div>
    );
}