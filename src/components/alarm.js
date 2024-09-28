// src/alarm.js
import React from 'react';
import ReactDOM from 'react-dom';
import Notification from '../components/Notification';
import '../styles/notification.css'; // Make sure this is included

let notificationContainer;
let alarmSound;
let snoozeTimeoutId; // Track the snooze timeout

// Helper function for logging
const log = (message) => {
    console.log(`[Alarm Log]: ${message}`);
};

export const requestNotificationPermission = async () => {
    if ('Notification' in window) {
        if (Notification.permission === 'default') {
            log('Requesting notification permission...');
            await Notification.requestPermission();
        }
    }
};

export const showStyledNotification = (message, onClose, onSnooze) => {
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        document.body.appendChild(notificationContainer);
    }

    const handleClose = () => {
        ReactDOM.unmountComponentAtNode(notificationContainer);
        document.body.removeChild(notificationContainer);
        notificationContainer = null;
        log('Notification closed.');
        onClose(); // Call the onClose callback to stop the sound
    };

    const handleSnooze = () => {
        log('Snooze clicked.');
        ReactDOM.unmountComponentAtNode(notificationContainer);
        document.body.removeChild(notificationContainer);
        notificationContainer = null;
        onSnooze(); // Trigger snooze
    };

    ReactDOM.render(
        <Notification 
            message={message} 
            onClose={handleClose} 
            onSnooze={handleSnooze} // Add a snooze button to the notification
        />, 
        notificationContainer
    );
};

export const setAlarm = async (selectedTime, snoozeMinutes = 5) => {
    await requestNotificationPermission(); // Request permission for notifications

    return new Promise((resolve, reject) => {
        alarmSound = new Audio('/sounds/sms-185447.mp3'); // Ensure this path is correct
        alarmSound.loop = true; // Set the sound to loop
        const now = new Date();
        const timeToAlarm = new Date(selectedTime);
        timeToAlarm.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());

        const timeout = timeToAlarm.getTime() - now.getTime();

        if (timeout > 0) {
            log(`Alarm set for ${selectedTime}. Time remaining: ${timeout}ms`);

            const timeoutId = setTimeout(() => {
                alarmSound.play().catch(reject);
                log('Alarm ringing!');

                // Show styled notification with snooze and close options
                showStyledNotification(
                    'Time to take action!', 
                    () => {
                        alarmSound.pause(); // Pause the sound when the notification is closed
                        alarmSound.currentTime = 0; // Reset the sound to the start
                        resolve(); // Indicate the alarm has gone off
                    },
                    () => {
                        alarmSound.pause(); // Pause sound during snooze
                        alarmSound.currentTime = 0; // Reset sound
                        log(`Snoozing for ${snoozeMinutes} minutes.`);
                        // Set snooze timer
                        snoozeTimeoutId = setTimeout(() => {
                            alarmSound.play().catch(reject);
                            log('Snooze alarm ringing!');
                            showStyledNotification('Snooze time is up!', () => {
                                alarmSound.pause();
                                alarmSound.currentTime = 0;
                                resolve(); // Resolve again after snooze
                            }, () => {}); // No more snooze on the snooze notification
                        }, snoozeMinutes * 60 * 1000); // Snooze duration in milliseconds
                    }
                );
            }, timeout);

            return () => {
                clearTimeout(timeoutId); // Cleanup on unmount
                clearTimeout(snoozeTimeoutId); // Clear snooze timeout if the alarm is cleared
                alarmSound.pause(); // Ensure sound is paused if the alarm is cleared
                log('Alarm cleared.');
            };
        } else {
            log('Failed to set alarm: Time has already passed.');
            reject(new Error('Time has already passed.'));
        }
    });
};
