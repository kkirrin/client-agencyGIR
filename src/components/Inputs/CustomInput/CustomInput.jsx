import styles from './style.module.scss';

export default function CustomInput({
  data = [],
  placeholder = 'Введите текст...',
  type = 'text',
  id = '',
  register = () => {},
  errors = {},
  name = 'input',
  hidden = false,
  item = {},
  idx
}) {
  // Инициализация значений по умолчанию
  const workerData = data[0] || {};
  const smenaDetails = item?.SmenaDetails || {};

  // Извлечение данных с проверками
  const {
    MonthDataTonnaj = [],
    Name = '',
    Job = '',
    DayDataOstatki = []
  } = workerData;

  const {
    Note: note = '',
    SmenaDataTonnaj: dayDataTonnaj = '',
    SmenaDateDetails: smenaDateDetails = '',
    TC: tc = ''
  } = smenaDetails;

  // Получение значений с проверкой вложенных свойств
  const getValue = () => {
    switch (name) {
      case 'AmountData':
        return MonthDataTonnaj[0]?.AmountData || '';
      
      case 'Name':
        return Name;
      
      case 'Job':
        return Job;
      
      case 'DayDataOstatkiGIR':
        return DayDataOstatki[0]?.DayDataOstatkiGIR || '';
      
      case 'DayDataOstatkiPORT':
        return DayDataOstatki[0]?.DayDataOstatkiPORT || '';
      
      case 'smenaDateDetails':
        return smenaDateDetails;
      
      case 'TC':
        return tc;
      
      case 'dayDataTonnaj':
        return dayDataTonnaj;
      
      case 'note':
        return note;
      
      default:
        return '';
    }
  };

    const value = getValue();
    
    console.log(note);

  return (
    <div className={styles.input_container}>
      <input
        id={id}
        className={styles.custom_input}
        type={type}
        hidden={hidden}
      
        placeholder={value ? String(value) : placeholder}
        {...register(name, { 
          required: 'Это поле обязательно',
          validate: (value) => value.trim() !== '' || 'Поле не может быть пустым'
        })}
      />
      
      {errors[name] && (
        <span className={styles.error}>
          {errors[name].message}
        </span>
      )}
    </div>
  );
}