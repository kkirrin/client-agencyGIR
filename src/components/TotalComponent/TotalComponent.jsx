import styles from './style.module.scss';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';

/**
 * allDates - сюда уже приходят отфильтрованные дни
 * object - это worker
 * toLocaleString() - форматирование вывода тонн (12 000)
 */

function TotalComponent({ object, allDates }) {

    // количество дневных смен, когда он работал (уточнить у заказчика)
    const totalAmountDaySmena = object?.DayDataDetails?.filter(item => {
        const smena = item?.DayInfo?.SmenaDetails;
        const date = smena?.SmenaDateDetails;
        const smenaStatus = smena?.SmenaStatusWorker;

        return smena && allDates.includes(date) &&
            smenaStatus !== "Not working" &&
            smenaStatus !== "Day Off";
    }).length;

    // количество ночных смен, когда он работал (уточнить у заказчика)
    const totalAmountNightSmena = object?.DayDataDetails?.filter(item => {
        const smena = item?.NightInfo?.SmenaDetails;
        const date = smena?.SmenaDateDetails;
        const smenaStatus = smena?.SmenaStatusWorker;

        return smena && allDates.includes(date) &&
            smenaStatus !== "Not working" &&
            smenaStatus !== "Day Off";;
    }).length;

    // сумма смен всего, сколько работал
    const totalAmountSmena = totalAmountDaySmena + totalAmountNightSmena;

    let totalSumTonnaj = 0;
    object?.DayDataDetails?.forEach(item => {
        // Дневная смена
        const daySmena = item?.DayInfo?.SmenaDetails;
        const dayDate = daySmena?.SmenaDateDetails;

        if (daySmena && allDates.includes(dayDate)) {
            const tonnaj = parseFloat(daySmena.SmenaDataTonnaj);
            totalSumTonnaj += isNaN(tonnaj) ? 0 : tonnaj;
        }

        // Ночная смена
        const nightSmena = item?.NightInfo?.SmenaDetails;
        const nightDate = nightSmena?.SmenaDateDetails;

        if (nightSmena && allDates.includes(nightDate)) {
            const tonnaj = parseFloat(nightSmena.SmenaDataTonnaj);
            totalSumTonnaj += isNaN(tonnaj) ? 0 : tonnaj;
        }
    });


    // число планое, сколько ему надо было выработать (на каждый месяц оно свое)
    const totalSumTonnajPlan = object?.MonthDataTonnaj[0]?.AmountData;

    // сумма тон осталась выработать в ГИР на конец месяца??? сумма выставии - тон смены
    const totalSumOstatokGir = object?.DayDataOstatki[0]?.DayDataOstatkiGIR;

    // сумма тон осталась выработать в ПОРТ на конец месяца??? сумма выставии - тон смены
    const totalSumOstatokPort = object?.DayDataOstatki[0]?.DayDataOstatkiPORT;

    return (
        <div className={styles.sum}>
            <div className={styles.sum_wrapper}>
                <p className={styles.sum_text}>Всего</p>
                <p className={styles.sum_month}>{format(new Date, 'LLLL', { locale: ru })}</p>
            </div>

            {[
                { label: 'Дневные смены', value: totalAmountDaySmena },
                { label: 'Ночные смены', value: totalAmountNightSmena },
                { label: 'Всего смен', value: totalAmountSmena },
                { label: 'Общий тоннаж', value: totalSumTonnaj },
                { label: 'Выставили', value: totalSumTonnajPlan },
                { label: 'Ост. Порт', value: totalSumOstatokGir },
                { label: 'Ост. ГиР', value: totalSumOstatokPort },
            ].map((item, index) => (
                <div className={styles.sum_detail} key={item.label}>
                    <p>{item.label}</p>
                    <p>{Number(item.value).toLocaleString()}</p>
                </div>
            ))}
        </div>
    )
}

export default TotalComponent