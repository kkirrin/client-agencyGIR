import styles from './style.module.scss';

export default function CustomInput({
  data = [],
  placeholder = 'Введите текст...',
  type = 'text',
  id = '',
  register = () => { },
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
    SmenaDataTonnaj: smenaDataTonnaj = '',
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

      case 'DayDataTonnaj':
        return smenaDataTonnaj;

      case 'note':
        return note;
      
      case 'order':
        return order;

      default:
        return '';
    }
  };

  const value = getValue();

  /**
   * 
   * TODO: баг в индексе, когда в name передаешь Index он подхватывает значение верное для каждого инпута
   * но тогда ломается отправка
   * сначала попробую отправить форму верно со всеми полями 
   * а потом вернусь сюда и выведу их (9:40:00 02.04.2025)
   */
  
  return (
    <div className={styles.input_container}>
      <input
        id={id}
        className={styles.custom_input}
        type={type}
        hidden={hidden}
        placeholder={value ? String(value) : placeholder}
        defaultValue={value ? value : ''}
        {...(
          typeof idx !== 'undefined' 
            ? register(`${name}.${idx}`, {
              })
            : register(name)
        )}
      />


      {errors[name] && (
        <span className={styles.error}>
          {errors[name].message}
        </span>
      )}
    </div>
  );
}