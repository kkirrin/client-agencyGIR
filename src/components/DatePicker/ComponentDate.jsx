import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { registerLocale } from 'react-datepicker';
import { useEffect, useState } from 'react'; 
import useDateStore from '../../store/CalendarStore';

registerLocale('ru', ru); 

export default function ComponentDate() {
    const { date, updateDate } = useDateStore(); 
    const [startDate, setStartDate] = useState(date);

    useEffect(() => {
        setStartDate(date); 
    }, [date]);

    const handleDateChange = (selectedDate) => {
        console.log('Выбранная дата: ', selectedDate)
        setStartDate(selectedDate);
        updateDate(selectedDate); 
    }

    useEffect(() => {
        console.log('Текущая дата из store: ', date);
    }, [date]); 

    return (
        <>
            <DatePicker
                showIcon
                toggleCalendarOnIconClick
                selected={startDate}
                onChange={handleDateChange}
                dateFormat="MMMM y"
                locale="ru" 
                shouldCloseOnSelect={false}
            />
        </>
    );
}

