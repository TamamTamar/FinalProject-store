/* // DateRangePicker.tsx
import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateRangePickerProps } from '../@Types/productType';



const DateRangePicker: FC<DateRangePickerProps> = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <DatePicker
                selected={startDate}
                onChange={onStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Select start date"
            />
            <DatePicker
                selected={endDate}
                onChange={onEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                placeholderText="Select end date"
            />
        </div>
    );
};

export default DateRangePicker; */