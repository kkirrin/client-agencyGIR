import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { registerLocale } from 'react-datepicker';
import { useState } from 'react';
import useDateSingleStore from '../../store/CalendarSingleStore';

registerLocale('ru', ru);


export default function ComponentDate({ dateForRender = '' }) {
    
    const { date, addDate } = useDateSingleStore(); 
    
    // форматирование и приведение к нужному формату
    const dateString = dateForRender;
    const [day, month, year] = dateString.split('.').map(Number);
    const dateObject = new Date(year, month - 1, day);
    
    const [selectedDates, setSelectedDates] = useState(dateObject ? dateObject : date);


    const handleDateChange = (date) => {
        setSelectedDates(date);
        addDate(date);
    };

    const handleClearDate = () => {
        setSelectedDates(null);
        addDate(null);
    };

    return (
        <div className='date-wrapper'>
            <DatePicker
                showIcon
                toggleCalendarOnIconClick
                selected={selectedDates}
                onChange={handleDateChange}
                onClear={handleClearDate}
                dateFormat="dd.MM.yyyy"
                locale="ru"
                shouldCloseOnSelect={false}
                withPortal
                isClearable={true}
            />
        </div>
    );
}