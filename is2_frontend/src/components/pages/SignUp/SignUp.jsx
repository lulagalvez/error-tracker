import React, { useState } from 'react';
import APIService from '../../services/APIService';
import "bootstrap/dist/css/bootstrap.min.css"
import "../../css/SignUp.css"

export default (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const apiservice = new APIService();

    const handleOnChangeName = (e) => {
        setName(e.target.value);
    };

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await SignUp();
        setShowAlert(true);
        setName('');
        setEmail('');
        setPassword('');
    };

    const SignUp = async () => {
        await apiservice.post('register', { name: name, email: email, password: password });
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Registrarse</h3>
                    {showAlert && (
                        <div className="alert alert-success" role="alert">
                            Usuario registrado correctamente.
                        </div>
                    )}
                    <div className="form-group mt-3">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            onChange={handleOnChangeName}
                            value={name}
                            className="form-control mt-1"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control mt-1"
                            placeholder="nombre@ejemplo.com"
                            onChange={handleOnChangeEmail}
                            value={email}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            onChange={handleOnChangePassword}
                            value={password}
                            className="form-control mt-1"
                            placeholder="Introduzca su contraseña"
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
    )
}
