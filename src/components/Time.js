import 'date-fns';
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid'; // Keep this import
import DateFnsUtils from '@date-io/date-fns'; // Keep this import
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'; // Keep this import
import { setAlarm } from '../components/alarm';
import "../styles/buttons.css";
import "../styles/reminder.css";

const Time = (props) => {
    const [selectedTime, setSelectedTime] = useState(props.value);

    useEffect(() => {
        const alarmCleanup = setAlarm(selectedTime).catch(error => {
            console.error("Alarm error:", error);
        });

        return () => {
            if (typeof alarmCleanup === 'function') {
                alarmCleanup(); // Cleanup if there's a return function from setAlarm
            }
        };
    }, [selectedTime]);

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        props.onChange(time);
    };

    return (
        <div className="input-time">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default Time;