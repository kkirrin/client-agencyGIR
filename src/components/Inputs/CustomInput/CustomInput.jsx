import styles from './style.module.scss';
import { format } from 'date-fns';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);


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

  /**
   * TODO: по хорошему это вынести в store чтобы оттуда дергать, но мне лень - я тюлень
   */

  let currentMonth = format(new Date(), 'MM', { locale: ru });
  // let currentMonth = '05';


  // Инициализация значений по умолчанию
  const workerData = data[0] || {};
  const smenaDetails = item?.SmenaDetails || {};

  // Извлечение данных с проверками
  let { MonthDataTonnaj = [] } = workerData;

  if (workerData !== undefined) { 
    MonthDataTonnaj = workerData?.MonthDataTonnaj?.map(i => {
      const [day, month, year] = i.MonthData.split('.').map(Number);
      const dateObj = new Date(year, month - 1, day);
      const itemMonth = format(dateObj, 'MM', { locale: ru });
        if (itemMonth === currentMonth) {
          return {
              AmountData: i.AmountData,
              MonthDataTonnaj: itemMonth 
          };
      }

      return null
    }).filter(item => item !== null)
  }

  const {
    Name = '',
    Job = '',
    DayDataOstatki = []
  } = workerData;

  const {
    Note: note = '',
    Order: order = '',
    SmenaDataTonnaj: smenaDataTonnaj = '',
    SmenaDateDetails: smenaDateDetails = '',
    TC: tc = ''
  } = smenaDetails;


  // Получение значений с проверкой вложенных свойств
  const getValue = () => {
    switch (name) {
      case 'AmountData':
        if (MonthDataTonnaj !== undefined) {
          return MonthDataTonnaj[0]?.AmountData
        };

        break;
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