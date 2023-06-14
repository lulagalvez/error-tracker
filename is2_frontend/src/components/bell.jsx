import {React, useState} from 'react';
import { IconContext } from 'react-icons';
import { FaBell } from 'react-icons/fa';
import Cookies from 'js-cookie';
import './css/notibell.css';

const NotiBell = () => {
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3);
    
    const handleClick = () => {
        setNotificationOpen(!isNotificationOpen);
        if(!isNotificationOpen){
            setNotificationCount(0)
        }
        //reiniciar contador despues de cerrar
    };

    return (
        <div className='bell-icon' onClick={handleClick}>
            <IconContext.Provider value={{ className: 'bell-icon__icon' }}>
                {notificationCount > 0 && (
                    <div className="notification-badge">
                        {notificationCount}
                    </div>
                )}
                <FaBell />
            </IconContext.Provider>
            {isNotificationOpen && (
                <ul className="notification-list">
                    <li>Notificación 1: eres lo q ma quiero en este mundo eso eres</li>
                    <li>Notificación 2</li>
                    <li>Notificación 3</li>
                </ul>)
            }
        </div>
    );
};

export default NotiBell;
