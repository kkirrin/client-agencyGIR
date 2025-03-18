import styles from './style.module.scss';

export default function CustomInput({ placeholder, type, id, register, errors, name }) {
  return (
    <div>
      <input
        id={id}
        className={styles.custom_input}
        type={type}
        placeholder={placeholder}
        {...register(name, { required: { value: true, message: `${placeholder} обязательно` } })}
      />
      {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
    </div>
  );
}