import styles from './style.module.scss';

export default function CustomInput({ placeholder, type }) {
    return (
        <input
            className={styles.cutom_input}
            type={type}
            placeholder={placeholder}
        />
    )
}