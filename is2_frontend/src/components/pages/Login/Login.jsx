import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./Login.css"

export const LogIn = () => {

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Autenticarse</h3>
                   
                    <div className="form-group mt-3">
                        <form>Correo Electrónico</form>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="nombre@ejemplo.com"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <form>Contraseña</form>
                        <input
                            type="password"
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

export default LogIn