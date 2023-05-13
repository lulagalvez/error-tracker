import React, { useCallback, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "../css/SignUp.css"

export const SignUp = () => {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, password, repassword);
    } 

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Registrarse</h3>
                    <div className="form-group mt-3">
                        <form onSubmit={handleSubmit}>Nombre</form>
                        <input
                            type="text"
                            onChange={e => setName(e.target.value)}
                            value={name}
                            className="form-control mt-1"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <form onSubmit={handleSubmit}>Correo Electrónico</form>
                        <input
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                            value = {email}
                            className="form-control mt-1"
                            placeholder="nombre@ejemplo.com"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <form onSubmit={handleSubmit}>Contraseña</form>
                        <input
                            type="password"
                            onChange={ e => setPassword(e.target.value)}
                            value = {password}
                            className="form-control mt-1"
                            placeholder="Introduzca su contraseña"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <form onSubmit={e => handleSubmit}>Repita Contraseña</form>
                        <input type= "password"
                               onChange={e => setRePassword(e.target.value)}
                               value={repassword}
                               className="form-control mt1"
                               placeholder="Repita su contraseña"
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

export default SignUp