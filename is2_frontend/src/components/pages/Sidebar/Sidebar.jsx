import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";
import Cookies from 'js-cookie'
import logo from '../../images/Debugger.png'

export const SideBar = () => {
    const handleLogout = () => {
        Cookies.remove('authenticated');
        Cookies.remove('name');
        Cookies.remove('email');
        Cookies.remove('type_of_user');
    };

    return (
        <div className="sidebar">
            <Link to="/devview">
                <div className="logo-container">
                    <img src={logo} alt="Logo" height="120" width="120" className="logo-img" />
                </div>
            </Link>
            <Link to="/report">
                <div className="icon-container new-report">
                    <i className="bi bi-file-earmark-plus-fill"></i>
                    <h1>New Report</h1>
                    <span className="oval"></span>
                </div>
            </Link>

            <Link>
                <div className="icon-container my-reports">
                    <i className="bi bi-clipboard2-check-fill"></i>
                    <h1>My Reports</h1>
                    <span className="oval"></span>
                </div>
            </Link>

            <Link to="/login">
                <div className="icon-container my-account" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-left"></i>
                    <h1>Log Out</h1>
                    <span className="oval"></span>
                </div>
            </Link>

        </div>
    );
};

export default SideBar;