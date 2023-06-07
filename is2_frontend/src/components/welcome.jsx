import React from 'react';
import { IconContext } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import Cookies from 'js-cookie';
import './css/welcome.css'

const WelcomeIcon = () => {
    const username = Cookies.get('name');
    return (
        <div className="welcome-icon">
            <IconContext.Provider value={{ className: 'welcome-icon__icon' }}>
                <FaUser />
            </IconContext.Provider>
            <h1 className="welcome-icon__message">
                ¡Bienvenido, {username}!
            </h1>
        </div>
    );
};

export default WelcomeIcon;