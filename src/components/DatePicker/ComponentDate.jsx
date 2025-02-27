import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { registerLocale } from 'react-datepicker';

import { CustomInputDate } from '../../components';

import React, { useState } from 'react'; 

registerLocale('ru', ru); 

export default function ComponentDate() {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <DatePicker
            showIcon
            toggleCalendarOnIconClick
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMMM y"
            locale="ru" 
            // customInput={<CustomInputDate />}
        />
    );
}

