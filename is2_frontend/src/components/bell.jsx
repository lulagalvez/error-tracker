import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { FaBell } from 'react-icons/fa';
import Cookies from 'js-cookie';
import './css/notibell.css';
import APIService from '../components/services/APIService';

const NotiBell = () => {
    const api_service = new APIService();
    const user_email = Cookies.get('email');
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    const handleClick = () => {
        setNotificationOpen(!isNotificationOpen);
        if (!isNotificationOpen) {
            setNotificationCount(0);
        }
        // reiniciar contador despues de cerrar
    };

    useEffect(() => {
        // Fetch notifications from API
        const fetchNotifications = async () => {
            try {
                const response = await api_service.get(`notification/${user_email}`);
                console.log(response);
                setNotifications(response);
                setNotificationCount(response.length);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [user_email]);

    return (
        <div className="bell-icon" onClick={handleClick}>
            <IconContext.Provider value={{ className: 'bell-icon__icon' }}>
                {notificationCount > 0 && (
                    <div className="notification-badge">{notificationCount}</div>
                )}
                <FaBell />
            </IconContext.Provider>
            {isNotificationOpen && (
                <ul className="notification-list">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <li key={notification.id}>{notification.content}</li>
                        ))
                    ) : (
                        <li>¡Estás al día! 😄</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default NotiBell;
