import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Login.css";
import APIService from '../../services/APIService';

export default (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const apiservice = new APIService();

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const Login = async () => {
        await apiservice.post('login', { email: email, password: password });
        
    }   
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            Login();
            console.log(email,password)
            // Aquí puedes realizar acciones adicionales después de un inicio de sesión exitoso
        } catch (error) {
            console.log(error);
            setShowAlert(true);
        }
        
        setEmail('');
        setPassword('');
    };
    

    return (
        <div className="Auth-form-container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {showAlert && (
                        <div className="alert alert-danger mt-3" role="alert">
                            Credenciales inválidas. Por favor, verifique su correo electrónico y contraseña.
                        </div>
                    )}

                    <form className="Auth-form" onSubmit={handleLogin}>
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Autenticarse</h3>
                            <div className="form-group mt-3">
                                <label htmlFor="email">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control mt-1"
                                    placeholder="nombre@ejemplo.com"
                                    value={email}
                                    onChange={handleOnChangeEmail}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control mt-1"
                                    placeholder="Introduzca su contraseña"
                                    value={password}
                                    onChange={handleOnChangePassword}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
