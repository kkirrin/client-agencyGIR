import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { registerLocale } from 'react-datepicker';
import { useEffect, useState } from 'react'; 
import useDateStore from '../../store/CalendarStore';

registerLocale('ru', ru); 

export default function ComponentDate() {
    const { dates, addDate, removeDate, clearDates } = useDateStore(); 
    const [selectedDates, setSelectedDates] = useState([]);

    // Обновление store
    useEffect(() => {
        setSelectedDates(dates); 
    }, [dates]);

    const handleDateChange = (selectedDate) => {
        const isDateSelected = selectedDates.some(d => d.getTime() === selectedDate.getTime());
        if (isDateSelected) {
            removeDate(selectedDate);
        } else {
            addDate(selectedDate); 
        }
    };

    const handleClearDates = () => {
        clearDates(); // Очищаем все выбранные даты
    };

    return (
        <div className='date-wrapper'>
            <DatePicker
                showIcon
                toggleCalendarOnIconClick
                selected={null}
                onChange={handleDateChange}
                dateFormat="MMMM y"
                locale="ru" 
                shouldCloseOnSelect={false}
                withPortal
                highlightDates={selectedDates.map(date => new Date(date))}
                isClearable={true}
            />
           <button onClick={handleClearDates}>Очистить все даты</button>
        </div>
    );
}

