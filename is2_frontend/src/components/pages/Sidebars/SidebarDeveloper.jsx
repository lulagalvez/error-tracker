import { React } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";
import Cookies from 'js-cookie'
import logo from '../../images/Debugger.png'

export const SideBarDeveloper = () => {
    const handleLogout = () => {
        Cookies.remove('authenticated');
        Cookies.remove('name');
        Cookies.remove('email');
        Cookies.remove('type_of_user');
        Cookies.remove('id');
    };
    return (
        <div className="sidebar">
            <Link to="/my_reports">
                <div className="logo-container-user">
                    <span>DebuGGer</span>
                </div>
            </Link>

            <Link to="/report">
                <div className="icon-container new-report">
                    <i className="bi bi-clipboard-data-fill"></i>
                    <h1>Estadísticas</h1>
                    <span className="oval"></span>
                </div>
            </Link>

            <Link to="/my_reports">
                <div className="icon-container my-reports">
                    <i className="bi bi-clipboard2-check-fill"></i>
                    <h1>Mis Reportes</h1>
                    <span className="oval"></span>
                </div>
            </Link>

            <Link to="/login">
                <div className="icon-container log-outuser" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-left"></i>
                    <h1>Cerrar Sesión</h1>
                    <span className="oval"></span>
                </div>
            </Link>

        </div>
    );
}
export default SideBarDeveloper;
