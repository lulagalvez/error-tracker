import React,{useEffect, useState} from 'react'
import APIService from '../../services/APIService';
import {BotonBorrar} from './BotonBorrar'
import {Buscador} from './Buscador'
import {Status} from './Status'
import './TablaAdmin.css'

function AdminView() {
    const [reports,setReports] =React.useState([])
    const [search, setSearch] = React.useState('');
    const [devs,setDevs] = React.useState([]);
    const apiservice=new APIService();
    const [selectedDev,setSelectedDev]= React.useState('')
    let devsName=[]

    const showData = async () =>{
        try {
            const reportsResponse = await apiservice.get('reports');
            console.log('reports', reportsResponse);
            setReports(reportsResponse);
        
            const devsResponse = await apiservice.get('devs');
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
    async function handleDevSelect(event) {
        console.log("true dat")
        const devId = event.target.value;
        setSelectedDev(devId);
    }
    // filtrado
    // const results = !search ? reports : reports.filter
    let results = []
    if (!search){
        results = reports
    }
    else{
        results= reports.filter( (dato) => 
        dato.title.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }
    const [numP,setNumP]=useState(0);
    const [idP,setIdP]=useState(0);
    const [numE,setNumE]=useState(0);
    const [idE,setIdE]=useState("");
    const [estado,setEstado]=useState("");
    useEffect( ()=> {
        showData()
        console.log("right ere boss")
      //  console.log('bugs', bugs);
    }, [])

    // async function handleDevSelect(event) {
    //     const devId = event.target.value;
    //     // setSelectedDev(devId);
    //     const reportsResponse = await api_service.put('update_report', devId);
    //     // setReports(reportsResponse);
    // }

    const getPos=(bug_id,array)=>{
        for(var i=0;i<array.length;i++){
            if(bug_id.startsWith(array[i].id)) return i;
        }
        return -1;
    }
    const setPrioridad=(event)=>{

       apiservice.patch('reports',numP,idP,'priority')
       .then(response => console.log(response)); 
    }
    const setStatus=(event)=>{
        apiservice.patch('reports',numE,idE,'status')
       .then(response => console.log(response)); 
    }
    const setDev=(pos,nuevoDev)=>{
        //var newArray=copiaArray();
        reports[pos].dev_id=nuevoDev;
      //  setBugs(newArray);
    }

    const updateReportDev = (report, dev) => {
        apiservice.patch("reports", report.id, )
    }

    const deleteReport  = (report) => {
        if (window.confirm("Estas seguro de que quieres eliminar el reporte?")) {
            apiservice.delete("reports", report.id)

            setReports(reports.filter(item => item !== report));
        }
    }
    
    //render
    return(
        <div class="container mt-4">
        <h1>Vista de lista de bugs</h1>
        <hr />
        {/* <input id="search" type="text" onChange={handleSearch} placeholder="Buscar por nombre de bug" /> */}
        <div class= "container mt-4"><input className="search-bar" type="search" class="form-control" value={search} onChange={searcher} placeholder="Buscar por nombre de bug" /></div>
        <br /> <br />
        <div className="ms-3">
            <div>
                <p>
                    Cambiar prioridad: -
                    <input type="text" onChange={e => setNumP(e.target.value)} placeholder="ID"/>
                    <input type="number" onChange={e => setIdP(e.target.value)} placeholder="Prioridad"/>
                    <button onClick={() => setPrioridad()}>Cambiar</button>
                </p>
            </div>
            <div>
      <p>
            Cambiar estado: -
            <input type="text" onChange={e => setNumE(e.target.value)} placeholder='ID'/>
            <select onChange={e => setIdE(e.target.value)}>
                <option value="">--Seleccione una opcion--</option>
                <option value="Closed">Cerrado</option>
                <option value="Pending">Pendiente</option>
                <option value="ToDo">Por asignar</option>
                <option value="Testing">Testing</option>
            </select>
            <button onClick={setStatus}>Cambiar</button>
      </p>
    </div>
        </div>
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
            {results.map((val, key) => {
                return (
                    <tr key={key}>
                        <td style={{ textAlign: 'center' }}>{val.id}</td>
                        <td style={{ textAlign: 'center' }}>{val.title}</td>
                        <td style={{ textAlign: 'center' }}>{val.user_name}</td>
                        <td style={{ textAlign: 'center' }}>{val.software_name}</td>
                        <td style={{ textAlign: 'center' }}>{val.date}</td>
                        {/* <td>{val.description}</td> */}
                        <td style={{ textAlign: 'center' }}>{val.urgency}</td>
                        <td><Buscador
                            texto={val.dev_id}
                            setTexto={nuevo => setDev(key,nuevo)}
                        /></td>
                        <td><Status nombre={val.status}/></td>
                        <td>
                            <BotonBorrar
                                report={val}
                                deleteReport={deleteReport}
                            />
                        </td>
                       
                         {/* falta agregar saltos de linea para cada depurador */}
                       
                        <div className='Devs-container' style={{ width: '300px' }}>
                        <p>{selectedDev.name}</p>

                        <select id="devs" onChange={handleDevSelect}>
                            <option value="">--Please choose an option--</option>
                            {devs.map(dev => (
                                <option key={dev.id} value={dev.id}>
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
