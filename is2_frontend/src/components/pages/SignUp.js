import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "../css/SignUp.css"

export default function (props) {
    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Registrarse</h3>
                    <div className="form-group mt-3">
                        <label>Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="nombre@ejemplo.com"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Introduzca su contraseña"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Repita Contraseña</label>
                        <input type= "password"
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