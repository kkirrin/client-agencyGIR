import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { registerLocale } from 'react-datepicker';
import { useEffect, useState } from 'react';
import useDateSingleStore from '../../store/CalendarSingleStore';
import useDateStore from '../../store/CalendarStore';

registerLocale('ru', ru);


export default function ComponentDate() {

    const { date, addDate } = useDateSingleStore(); 
    const { dates } = useDateStore();

    const [selectedDates, setSelectedDates] = useState(date);
    
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