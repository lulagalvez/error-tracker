import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { FaBell, FaTrash } from 'react-icons/fa';
import Cookies from 'js-cookie';
import './css/notibell.css';
import APIService from '../components/services/APIService';

const NotiBell = () => {
    const api_service = new APIService();
    const user_email = Cookies.get('email');
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [notificationsToDelete, setNotificationsToDelete] = useState([]);

    const handleClick = () => {
        setNotificationOpen(!isNotificationOpen);
        if (!isNotificationOpen) {
            setNotificationCount(0);
        }
        // Reiniciar contador después de cerrar
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

    const handleDelete = async () => {
        try {
            await api_service.patchById('notification',user_email);
            setNotifications([]);
            setNotificationCount(0);
        } catch (error) {
            console.error('Error deleting notifications:', error);
        }
    };
    return (
        <div className="bell-icon" onClick={handleClick}>
            <IconContext.Provider value={{ className: 'bell-icon__icon' }}>
                {notificationCount > 0 && (
                    <div className="notification-badge">{notificationCount}</div>
                )}
                <FaBell />
            </IconContext.Provider>
            {isNotificationOpen && (
                <div className="notification-container">
                    <div className="notification-header">
                        <div className="notification-title"></div>
                        {notifications.length > 0 && (
                            <div>
                                <FaTrash className="trash-icon" onClick={handleDelete}/>
                            </div>
                        )}
                    </div>
                    <ul className="notification-list">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <li key={notification.id}>
                                    <br />
                                    <div>{notification.content}</div>
                                </li>
                            ))
                        ) : (
                            <li>¡Estás al día! 😄</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NotiBell;
