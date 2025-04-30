import { Form } from '../../components';
import styles from './style.module.scss';
import fetchData from '../../utils/fetchData';
import { useEffect } from 'react';
import useDataRequestStore from '../../store/DataRequestStore';
import { useParams } from 'react-router-dom';

export default function AddPopupContent({ id, active, setActive, title }) {
  const params = useParams();
  const slug = params.slug;

  // TODO удалить
  // active = true

  let formName;
  let apiUrl;
  switch (slug) {
    case 'object_6':
      {
        formName = 'tech';
        apiUrl = `http://89.104.67.119:1337/api/techicas?filters[id][$eq]=${id}&populate[DayDataDetails][populate][DayInfo][populate]=*&populate[DayDataDetails][populate][NightInfo][populate]=*`;
      }
      break;
    case 'object_5':
      {
        formName = 'drobilka';
        apiUrl = `http://89.104.67.119:1337/api/drobilkas?filters[id][$eq]=${id}&populate[DayDataDetails][populate][DayInfo][populate]=*&populate[DayDataDetails][populate][NightInfo][populate]=*&populate[MonthDataTonnaj][populate]=*&populate[DayDataOstatki][populate]=*`;
      }
      break;

    default:
      {
        formName = 'people';
        apiUrl = `http://89.104.67.119:1337/api/people?filters[id][$eq]=${id}&populate[DayDataDetails][populate][DayInfo][populate]=*&populate[DayDataDetails][populate][NightInfo][populate]=*&populate[MonthDataTonnaj][populate]=*&populate[DayDataOstatki][populate]=*`;
      }
      break;
  }
  const { setDataRequest, clearData } = useDataRequestStore();

  /**
   *
   * TODO: сделать запрос UPDATE
   * если сотрудник уже создан
   * добавить сюда запрос чтобы получать технику и сувать его в стор
   *
   */

  // ЭТО ПОВТОРЫЙ ЗАПРОС
  useEffect(() => {
    if (active) {
      const fetchAndSetData = async () => {
        try {
          const data = await fetchData(apiUrl);
          setDataRequest(data);
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      };

      fetchAndSetData();
    } else {
      clearData();
    }
  }, [active, setDataRequest, clearData]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      setActive(false);
    }
  };

  return (
    <div
      id={id}
      className={`${styles.popup} ${
        active ? styles.popupActive : styles.popupNone
      }`}
      onClick={() => setActive(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className={styles.popup__body}>
        <div
          className={styles.popup__content}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.popup_close_wrapper}>
            <button
              className={styles.popup__close}
              onClick={() => {
                setActive(false);
              }}
            >
              <svg
                width='23'
                height='22'
                viewBox='0 0 23 22'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  x='3'
                  y='18.4463'
                  width='21.8033'
                  height='0.726776'
                  rx='0.363388'
                  transform='rotate(-45 3 18.4463)'
                  fill='#2a3a57'
                />
                <rect
                  x='4.21094'
                  y='3'
                  width='21.8033'
                  height='0.726776'
                  rx='0.363388'
                  transform='rotate(45 4.21094 3)'
                  fill='#2a3a57'
                />
              </svg>
            </button>
          </div>

          <Form
            title={title}
            forWhat={formName}
            setActive={setActive}
            popupId={id}
          />
        </div>
      </div>
    </div>
  );
}
