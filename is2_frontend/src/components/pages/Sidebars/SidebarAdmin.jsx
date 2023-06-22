import { React } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";
import Cookies from 'js-cookie'
import WelcomeIcon from '../../welcome';

export const SideBarAdmin = () => {
    const handleLogout = () => {
        Cookies.remove('authenticated');
        Cookies.remove('name');
        Cookies.remove('email');
        Cookies.remove('type_of_user');
        Cookies.remove('id');
    };
    return (
      <div className="sidebar">
        <Link to="/adminview">
          <div className="logo-container-admin">
            <span>DebuGGer</span>
          </div>
        </Link>

        <WelcomeIcon />
        
        <Link to="/adminview">
          <div className="icon-container assign-bug">
            <i className="bi bi-file-person-fill"></i>
            <h1>Asignar Bug</h1>
            <span className="oval"></span>
          </div>
        </Link>

        <Link to="/reassign_requests">
          <div className="icon-container">
            <i className="bi bi-hand-thumbs-up-fill"></i>
            <h1>Reasignar</h1>
            <span className="oval"></span>
          </div>
        </Link>

        <Link to="/login">
          <div className="icon-container log-outadmin" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left"></i>
            <h1>Cerrar Sesión</h1>
            <span className="oval"></span>
          </div>
        </Link>
      </div>
    );

};

export default SideBarAdmin;
