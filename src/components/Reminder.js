import React, { useState } from "react";
import Date from "./Date";
import Text from "./Text";
import Time from "./Time";
import { store } from "../store/store";
import "../styles/reminder.css";
import "../styles/ureminder.css";
import "../styles/preminders.css";
import "../styles/buttons.css";
import ComingReminders from "./ComingReminders";
import PastReminders from "./PastReminders";
import { useSelector } from "react-redux";
import { addReminder } from "../store/reminderReducer";

const Reminder = () => {        
    const newDate = new window.Date();
    
    const [text, setText] = useState("");
    const [date, setDate] = useState(newDate);
    const [time, setTime] = useState(newDate);
    
    const userIndex = useSelector((state) => state.loggedIndexReducer[0]);
    const userEmail = useSelector((state) => state.userReducer[userIndex].email);

    const handleTextChange = (e) => {
        setText(e.target.value);
    }    

    const handleDateChange = (changedDate) => {
        setDate(changedDate);
    }    

    const handleTimeChange = (changedTime) => {
        setTime(changedTime);
    }  
    
    const handleSubmit = () => {
        const newReminder = {
            email: userEmail,
            text: text,
            date: date,
            time: time
        }

        store.dispatch(addReminder(newReminder));
        setText("");
        setDate(newDate);
        setTime(newDate);
    }

    return(
        <div>
           <div style={{
    fontFamily: "sans-serif",
    padding: "10px",
    textAlign: "left", // Align text to the left
    marginLeft: "20px", // Add left margin for spacing
    fontSize: "18px",
    backgroundColor: "#E1D7C6",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    width: "20%", // Adjust width as needed
}}>
    <span style={{
        fontWeight: "bold",
        color: "#3f51b5", // Custom color
        fontSize: "20px", // Increase font size for emphasis
    }}>
        Welcome
    </span>
    <span> <b>{userEmail}</b>!</span>
</div>

            <div className = "reminder-form">
                <div className = "reminder-container">
                    <Text value = {text} onChange = {(e) => handleTextChange(e)} />
                    <Date value = {date} onChange = {handleDateChange} />            
                    <Time value = {time} onChange = {handleTimeChange} />
                    <div className = "add-reminder-div">
                        <input className = "add-reminder" type = "button" value = "ADD REMINDER" onClick =  {handleSubmit} />
                    </div>
                </div>
                <div className = "upcoming-container">
                    <ComingReminders />
                </div>
                <div className = "past-container">
                    <PastReminders />
                </div>
            </div>
        </div>
    );
}

export default Reminder;
