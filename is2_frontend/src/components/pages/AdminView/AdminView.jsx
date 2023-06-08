import React, { useEffect, useState } from 'react'
import APIService from '../../services/APIService';
import { BotonBorrar } from './BotonBorrar'
import { Status } from './Status'
import './TablaAdmin.css'
import Filter from './Filter'

function AdminView() {
    const [reports, setReports] = React.useState([])
    const [search, setSearch] = React.useState('');
    const [devs, setDevs] = React.useState([]);
    const api_service = new APIService();
    const [selectedDev, setSelectedDev] = React.useState('')
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedSoftware, setSelectedSoftware] = useState("");
    const [selectedUrgency, setSelectedUrgency] = useState("");
    const [selectedFilterDev,setSelectedFilterDev] = useState("");
    const [numP, setNumP] = useState(0);
    const [idP, setIdP] = useState(0);
    const [numE, setNumE] = useState(0);
    const [idE, setIdE] = useState("");
    const [estado, setEstado] = useState("");
    let devsName = []
    const statusColors = {
        Pending: "status-pending",
        ToDo: "status-to-do",
        Testing: "status-testing",
        Closed: "status-closed",
      };
    const showData = async () => {
        try {
            const reportsResponse = await api_service.get('reports');
            console.log('reports', reportsResponse);
            setReports(reportsResponse);

            const devsResponse = await api_service.get('devs');
            console.log('devs', devsResponse);
            setDevs(devsResponse);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // funcion de busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
        // console.log(e.target.value)
    }
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
    
      const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
      };
    
      const handleSoftwareChange = (event) => {
        setSelectedSoftware(event.target.value);
      };
    
      const handleUrgencyChange = (event) => {
        setSelectedUrgency(event.target.value);
      };
      const handleFilterDevChange = (event) => {
        setSelectedFilterDev(event.target.value);
      };
    // filtrado
    // const results = !search ? reports : reports.filter
    let results = []
    if (!search) {
        results = reports
    }
    else {
        results = reports.filter((dato) =>
            dato.title.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }
    useEffect(() => {
        showData()
        console.log("right ere boss")
        //  console.log('bugs', bugs);
    }, [])
    const filteredBugReports = reports.filter((reports) => {
        const title = reports.title.toString().toLowerCase();
        const status = reports.status.toString().toLowerCase();
        const software = reports.software_name?.toString().toLowerCase();
        const developer = reports.dev_name?.toString().toLowerCase();
        const urgency = reports.urgency.toString().toLowerCase();
        const isMatchingUrgency = selectedUrgencyw
          ? reports.urgency === selectedUrgency.toLowerCase()
          : true;
          const isMatchingDev = selectedFilterDev
          ? reports.dev_name === selectedFilterDev.toLowerCase()
          : true;
        const isMatchingTitle = title.includes(searchTerm.toLowerCase());
        const isMatchingStatus = selectedStatus
          ? status === selectedStatus.toLowerCase()
          : true;
        const isMatchingSoftware = selectedSoftware
          ? software === selectedSoftware.toLowerCase()
          : true;
        return (
          isMatchingUrgency &&
          isMatchingTitle &&
          isMatchingStatus &&
          isMatchingSoftware &&
          isMatchingDev
        );
      });
      const statusOptions = Object.keys(statusColors);
      const softwareOptions = [
        ...new Set(reports.map((reports) => reports.software_name)),
      ];
      const urgencyOptions = [
        ...new Set(reports.map((reports) => reports.urgency)),
      ];
      const devOptions = [
        ...new Set(reports.map((reports) => reports.dev_name)),
      ];
    // async function handleDevSelect(event) {
    //     const devId = event.target.value;
    //     // setSelectedDev(devId);
    //     const reportsResponse = await api_service.put('update_report', devId);
    //     // setReports(reportsResponse);
    // }

    const getPos = (bug_id, array) => {
        for (var i = 0; i < array.length; i++) {
            if (bug_id.startsWith(array[i].id)) return i;
        }
        return -1;
    }

    const setPrioridad = (event) => {

        api_service.patch('reports', numP, idP, 'priority')
            .then(response => console.log(response));
    }
    const setStatus = (event) => {
        api_service.patch('reports', numE, idE, 'status')
            .then(response => console.log(response));
    }
    const setDev = (pos, nuevoDev) => {
        //var newArray=copiaArray();
        reports[pos].dev_id = nuevoDev;
        //  setBugs(newArray);
    }

    const handleDevSelect = (event, report) => {
        const dev_email = event.target.value;
        api_service.patch('reports', report.id, dev_email, 'dev')
            .then(response => console.log(response));
    }



    const deleteReport = (report) => {
        if (window.confirm("Estas seguro de que quieres eliminar el reporte?")) {
            api_service.delete("reports", report.id)

            setReports(reports?.filter(item => item !== report));
        }
    }

    //render
    return (
        <div class="container mt-4">
            <h1>Vista de lista de bugs</h1>
            <hr />
            {/* <input id="search" type="text" onChange={handleSearch} placsholder="Buscar por nombre de bug" /> */}

            <br /> <br />
            <div className="ms-3">
                <p>
                    Cambiar prioridad:
                </p>
                <form>
                    <div className="row">

                        <div className="col-3"><input className="form-control" type="text" onChange={e => setNumP(e.target.value)} placeholder="ID" /> </div>

                        <div className="col-3"><input className="form-control" type="number" onChange={e => setIdP(e.target.value)} placeholder="Prioridad" min="1" max="6" /></div>
                        <div className="col-2"><button className="btn btn-outline-secondary" onClick={() => setPrioridad()}>Cambiar</button></div>

                    </div>
                </form>

                <div>
                    <p>
                        Cambiar estado:
                    </p>
                    <form>
                        <div className="row">
                            <div className="col-3">
                                <input className="form-control" type="text" onChange={e => setNumE(e.target.value)} placeholder='ID' />
                            </div>
                            <div className="col-3">
                                <select className="form-select" onChange={e => setIdE(e.target.value)}>
                                    <option value="">--Seleccione una opcion--</option>
                                    <option value="Closed">Cerrado</option>
                                    <option value="Pending">Pendiente</option>
                                    <option value="ToDo">Por asignar</option>
                                    <option value="Testing">Testing</option>
                                </select>
                            </div>
                            <div className="col-2">
                                <button className="btn btn-outline-secondary" onClick={() => setStatus}>Cambiar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                        <Filter searchTerm={searchTerm}
                    selectedStatus={selectedStatus}
                    selectedSoftware={selectedSoftware}
                    selectedUrgency={selectedUrgency}
                    selectedFilterDev={selectedFilterDev}
                    filteredBugReports={filteredBugReports}
                    handleSearch={handleSearch}
                    handleStatusChange={handleStatusChange}
                    handleSoftwareChange={handleSoftwareChange}
                    handleUrgencyChange={handleUrgencyChange} 
                    handleFilterDevChange={handleFilterDevChange}
                    statusOptions={statusOptions}
                    softwareOptions={softwareOptions}
                    urgencyOptions={urgencyOptions}
                    devOptions={devOptions}/>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Tracking ID</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Software</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Prioridad</th>
                        <th scope="col">Depurador</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                {filteredBugReports && filteredBugReports.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td style={{ textAlign: 'center' }}>{val.id}</td>
                            <td style={{ textAlign: 'center' }}>{val.title}</td>
                            <td style={{ textAlign: 'center' }}>{val.user_name}</td>
                            <td style={{ textAlign: 'center' }}>{val.software_name}</td>
                            <td style={{ textAlign: 'center' }}>{val.date}</td>
                            {/* <td>{val.description}</td> */}
                            <td style={{ textAlign: 'center' }}>{val.urgency}</td>
                            <td style={{ textAlign: 'center' }}>{val.dev_name}</td>
                            {/* <td>
                                <Buscador
                                    texto={val.dev_id}
                                    setTexto={nuevo => setDev(key, nuevo)}
                                />
                            </td> */}
                            <td>
                                <Status
                                    nombre={val.status}
                                />
                            </td>
                            <td>
                                <BotonBorrar
                                    report={val}
                                    deleteReport={deleteReport}
                                />
                            </td>

                            {/* falta agregar saltos de linea para cada depurador */}

                            <div className='Devs-container' style={{ width: '300px' }}>
                                <select id="devs" onChange={e => handleDevSelect(e, val)}>
                                    <option value="">Asignar Depurador</option>
                                    {devs.map(dev => (
                                        <option key={dev.id} value={dev.email}>
                                            {dev.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default AdminView;
