import dayjs from 'dayjs';
import React, { useEffect } from 'react'
import { useState } from 'react';

function DateInput({ onchange, defaultValue }) {
    const [date, setDate] = useState(defaultValue ? dayjs(defaultValue).format("DD/MM/YYYY") : "");

    const ref = React.useRef();

    const handleOnFocus = () => {
        ref.current.type = 'date';
        try {
            ref.current.showPicker();
        } catch (error) {
            /* Fall back to another picker mechanism */
        }
    }

    const handleOnBlur = () => {
        if (date.length === 0) ref.current.type = 'text';
    }

    useEffect(() => {
        if (defaultValue) {
            ref.current.type = 'text';
            setDate(dayjs(defaultValue).format("DD/MM/YYYY"))
        } else {
            setDate('')
        }
    }, [defaultValue])

    return (
        <input
            onChange={(event) => {
                setDate(event.target.value)
                onchange(new Date(event.target.value))
            }}
            ref={ref} value={date} onFocus={handleOnFocus} onBlur={handleOnBlur} type='text' placeholder='select date' />
    )
}

export default DateInput
