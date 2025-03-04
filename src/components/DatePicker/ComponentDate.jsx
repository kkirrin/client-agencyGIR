import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { registerLocale } from 'react-datepicker';

import { useState } from 'react'; 
import useDateStore from '../../store/CalendarStore';

registerLocale('ru', ru); 

export default function ComponentDate() {
    const { date, updateDate } = useDateStore(); 
    const [startDate, setStartDate] = useState(new Date()); 

    console.log(date);
    const handleDateChange = (date) => {
        console.log(date);

        setStartDate(date);
        updateDate(date);
    }

    return (
        <>
            <DatePicker
                showIcon
                toggleCalendarOnIconClick
                selected={startDate}
                onChange={handleDateChange}
                dateFormat="MMMM y"
                locale="ru" 
                // customInput={<CustomInputDate />}
            />
        </>
    );
}

