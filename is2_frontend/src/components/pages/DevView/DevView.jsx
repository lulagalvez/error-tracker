import React,{useEffect} from 'react'
import APIService from '../../services/APIService';


function DevView() {
    function crearTabla(dato,fila){
        var td=document.createElement("td")
        td.innerText=dato
        fila.appendChild(td)
    }
        
  return ( 
    <div>
            <head>
                <meta charset="UTF-8"/>
                <title>Vista de bugs</title>
            </head>
            <body>
                <h1>Vista de lista de bugs y de depuradores</h1>
                <hr/>
                <input id="txt" type="text" placeholder="Buscar por nombre de bug"></input> 
                <input id="botonBuscarB" type="submit" value="Buscar"></input> 
                <p>
                    Ordenar bugs por:
                    <select id="ordenBugs">
                        <option value="idB">ID</option>
                        <option value="nombreB">Nombre del bug</option>
                        <option value="descB">Descripcion</option>
                        <option value="priorityB">Prioridad</option>
                        <option value="solvedB">Resuelto</option>
                    </select>
                    <input id="botonOrdenB" type="submit" value="Ordenar"></input> 
                </p>
                <table id="Bugs" border="1">
                    <tr>
                        <th>ID</th>
                        <th>Nombre del bug</th>
                        <th>Descripcion</th>
                        <th>Depuradores asignados</th>
                        <th>Prioridad</th>
                        <th>Resuelto</th>
                    </tr>
                </table>
                <br/>
                <table id="Devs" border="1">
                    <tr>
                        <th>ID</th>
                        <th>Nombre del depurador</th>
                        <th>Cant. de bugs asignados</th>
                    </tr>
                </table>
                <p>
                    Asignar prioridad a bug:
                    <input id="prioridadIdBug" type="text" placeholder="ID Bug"></input> 
                    <input id="prioridadPrBug" type="text" placeholder="Prioridad"></input> 
                    <input id="botonPrBug" type="submit" value="Asignar"/> <br /> <br />
                    Asignar bug a depurador:
                    <input id="devIdBug" type="text" placeholder="ID Depurador"/>
                    <input id="devIdDev" type="text" placeholder="ID Bug"/>
                    <input id="botonIdDev" type="submit" value="Asignar"/>
                </p>
                <script src="vista_j.js" type="text/javascript"></script>
            </body>

    </div>
  )
}

export default DevView
