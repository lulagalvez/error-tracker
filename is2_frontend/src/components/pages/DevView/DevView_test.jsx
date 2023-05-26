import React, { useEffect, useState } from 'react';
import APIService from '../../services/APIService';

function DevView_test() {
  const [devs, setDevs] = useState([]);
  const [selectedDev, setSelectedDev] = useState('');
  const [reports, setReports] = useState([]);
  const api_service = new APIService();

  useEffect(() => {
    async function fetchData() {
      const response = await api_service.get('devs');
      setDevs(response);
    }
    fetchData();
  }, []);

  async function handleDevSelect(event) {
    const devId = event.target.value;
    setSelectedDev(devId);
    const reportsResponse = await api_service.get('dev_reports', devId);
    setReports(reportsResponse);
  }



    return ( 
        <div>
                <head>
                    <meta charset="UTF-8"/>
                    <title>Vista de bugs</title>
                </head>
                <body>
                    <h1>Vista de developer</h1>

                    
                    <hr/>
                    <div>
                        <label htmlFor="devs">Select a dev:</label>
                        <select id="devs" onChange={handleDevSelect}>
                            <option value="">--Please choose an option--</option>
                            {devs.map(dev => (
                            <option key={dev.id} value={dev.id}>
                                {dev.name}
                            </option>
                            ))}
                        </select>

                        <ul>
                            {reports.map(report => (
                            <li key={report.id}>{report.title}</li>
                            ))}
                        </ul>
                        </div>
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
    


    
  );
}

export default DevView_test;
