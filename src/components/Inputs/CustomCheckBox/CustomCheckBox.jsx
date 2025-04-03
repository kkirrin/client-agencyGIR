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
}) {

    const getCurrentStatus = () => {
        const dayDetail = data[0]?.DayDataDetails?.[idx];
        
        return dayDetail?.DayInfo?.SmenaDetails?.SmenaStatusWorker 
        || dayDetail?.NightInfo?.SmenaDetails?.SmenaStatusWorker 
        || 'Default';
    };

     // Определяем checked состояние
    const isChecked = getCurrentStatus() === value;
    
    return (
        <div className={styles.item}>
              <input 
                name={name}
                type={'radio'} 
                id={checkboxId}
                value={value}
                hidden={hidden}
                defaultChecked={defaultChecked} 
                checked={isChecked}
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