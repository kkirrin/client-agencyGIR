import styles from './style.module.scss';

export default function CustomCheckBox({
    defaultChecked = false, 
    hidden = false,
    checkboxId,
    register,
    label,
    value,
    name,
    data,
    idx,
})
{
    console.log(data[0]?.DayDataDetails[idx]?.DayInfo?.SmenaDetails?.SmenaStatusWorker);
    console.log(data[0]?.DayDataDetails[idx]?.NightInfo?.SmenaDetails?.SmenaStatusWorker);

    return (
        <div className={styles.item}>
            <input 
                name={name}
                type={'radio'} 
                id={checkboxId}
                value={value}
                hidden={hidden}
                defaultChecked={defaultChecked} // Используем defaultChecked вместо checked
                {...(
                    typeof idx !== 'undefined' 
                        ? register(name, {
                            validate: v => v?.toString().trim() !== '' || 'Поле не может быть пустым'
                          })
                        : register(name)
                )}
            />
            <label 
                htmlFor={checkboxId}
                hidden={hidden}
            >
                {label}
            </label>
        </div>
    );
}