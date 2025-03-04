import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { registerLocale } from 'react-datepicker';

import { CustomInputDate } from '../../components';

import React, { useState } from 'react'; 
import useDateStore from '../../store/CalendarStore';

registerLocale('ru', ru); 

export default function ComponentDate() {
    const { data_date, updateDate } = useDateStore();
    const [startDate, setStartDate] = useState(new Date());

    return (
        <>
        
        <DatePicker
            showIcon
            toggleCalendarOnIconClick
            selected={startDate}
            onChange={(date) => setStartDate(updateDate(date))}
            dateFormat="MMMM y"
            locale="ru" 
            // customInput={<CustomInputDate />}
            />
        </>
    );
}

