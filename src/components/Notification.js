// src/components/Notification.js
import React from 'react';
import '../styles/notification.css';

const Notification = ({ message, onClose, onSnooze }) => {
    return (
        <div className="notification">
            <span>{message}</span>
            <div className="notification-buttons">
                <button className="close-button" onClick={onClose}>Close</button>
                <button className="snooze-button" onClick={onSnooze}>Snooze</button> {/* Snooze Button */}
            </div>
        </div>
    );
};

export default Notification;
