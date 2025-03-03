import styles from './style.module.scss';

export default function CustomInput({ placeholder, type, id }) {
    return (
        <input
            id={id}
            className={styles.custom_input}
            type={type}
            placeholder={placeholder}
        />
    )
}