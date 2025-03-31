import styles from './style.module.scss';

export default function CustomInput({
        data = '',
        placeholder = 'Enter text...',
        type = 'text',
        id = '',
        register = () => {},
        errors = '',
        name = 'input',
        hidden = false
}) {
    
    let valueInput = '';
    if (data[0]) {
        let firstObject = data[0];
    
        const { MonthDataTonnaj, Name, Job, DayDataOstatki } = firstObject;

        const amountData = MonthDataTonnaj[0].AmountData;
        const dayDataOstatkiGIR = DayDataOstatki[0].DayDataOstatkiGIR;
        const dayDataOstatkiPORT = DayDataOstatki[0].DayDataOstatkiPORT;

        
        /** 
         * 
         * TODO: 
         * Тут нужно сделать проверку на то, техника, дробилка или человек ли это?
         * Возможно, надо будет передавать в props еще один идентификатор inputa, чтобы делать еще сколько-то кейсов
         * 
         * 
         */

        console.log(valueInput);
        switch (name) {
            case 'AmountData':
                valueInput = amountData ? amountData : 'Ошибка получения заполненных данных или данных нет' ;
                break;
            
            case 'Name':
                valueInput = Name ? Name : 'Ошибка получения заполненных данных или данных нет' ;
                break;
            
            case 'Job':
                valueInput = Job ? Job : 'Ошибка получения заполненных данных или данных нет' ;
                break; 
            
            case 'DayDataOstatkiGIR':
                // Возможно тут будет пересчитываться динамически 
                valueInput = dayDataOstatkiGIR ? dayDataOstatkiGIR : 'Ошибка получения заполненных данных или данных нет' ;
                break;
            
            case 'DayDataOstatkiPORT':
                // Возможно тут будет пересчитываться динамически 
                valueInput = dayDataOstatkiPORT ? dayDataOstatkiPORT : 'Ошибка получения заполненных данных или данных нет' ;
                break;
        }
    }

    return (
        <div>
            <input
                id={id}
                className={styles.custom_input}
                hidden={hidden}
                type={type}
                defaultValue={valueInput}
                placeholder={placeholder}
                {...register(name)}
            />
            {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
        </div>
    );
}