import React from 'react'
import {BotonBorrar} from './BotonBorrar'
import {BotonEditar} from './BotonEditar'
import APIService from '../../../services/APIService'
//import './Ajustes.css'
//dejar espacio min de 150 pixeles a la izquierda


export const TablaAdmin = () => {
    const apiservice = new APIService();
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <table className="table table-striped ms-2">
              <thead>
                <tr>
                  <th scope="col">Tracking ID</th>
                  <th scope="col">Titulo</th>
                  <th scope="col">Software</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Prioridad</th>
                  <th scope="col">Depurador</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Accion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">#18933</th>
                  <td>Ticket 1</td>
                  <td>Wiktoria</td>
                  <td>22/05/2022</td>
                  <td>2</td>
                  <td>
                    <BotonEditar /> nombre1
                  </td>
                  <td>Cerrado</td>
                  <td>
                    <BotonBorrar />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}
