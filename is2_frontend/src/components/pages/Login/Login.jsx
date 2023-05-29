import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Login.css";
import APIService from '../../services/APIService';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';

export default (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const apiservice = new APIService();
    const navigate = useNavigate();

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const doLogin = async () => {
        await apiservice.post('login', { email: email, password: password });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await doLogin();
        const loggedIn = Cookies.get('authenticated');
        const type = Cookies.get('type_of_user');
        console.log(loggedIn);
        console.log(type);
        if (loggedIn && type === 'admin') {
            navigate("/adminviewmain");
        } else if (loggedIn && type === 'developer') {
            navigate("/devview");
        } else if(loggedIn && type === 'user'){
            navigate("/userreportview");
        }
        else{
            setShowAlert(true);
            console.log("no te logueaste machine");
            navigate('/login');
        }
    
        setEmail('');
        setPassword('');
    };

    return (
        <div className="Auth-form-container">
            <div className="row justify-content-center">
                <div className="text-center mx-auto">
                    {showAlert && (
                        <div className="alert alert-danger text-center mx-auto" role="alert">
                            Credenciales inválidas. Por favor, verifique su correo electrónico y contraseña.
                        </div>
                    )}
                    <form className="Auth-form" onSubmit={handleLogin}>
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Autenticarse en Debugger</h3>
                            <div className="Auth-form-text">No tienes cuenta?</div>
                            <Link to="/signup">Registrarse</Link>
                            <div className="form-group mt-3">
                                <label htmlFor="email">Correo Electrónico</label>
                                <input type="email" id="email" className="form-control mt-1" placeholder="nombre@ejemplo.com" value={email} onChange={handleOnChangeEmail} />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" id="password" className="form-control mt-1" placeholder="Introduzca su contraseña" value={password} onChange={handleOnChangePassword} />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary"> Enviar </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};