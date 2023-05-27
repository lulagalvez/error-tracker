import React,{useEffect, useState} from 'react'
import APIService from '../../services/APIService';
import {BotonBorrar} from './BotonBorrar'
import {BotonEditar} from './BotonEditar'

function AdminView() {
    const [reports,setReports] =React.useState([])
    const [search, setSearch] = React.useState('');
    const [devs,setDevs] = React.useState([]);
    const apiservice=new APIService();
    const [selectedDev,setSelectedDev]= React.useState('')
    let devsName=[]

    const showData = () =>{
        apiservice.get('reports')
        //.then(response => response.json())
        .then(response => {
            console.log('reports',response);
            setReports(response);
        })
         apiservice.get('devs')
        .then(response =>{
            console.log('devs',response);
            setDevs(response);
        })
        // devsName=  devs.map(item=> ({label: item.name, value: item.name == 'N/A' ? 'queso' : item.id }))
        // devsName = devs.map(function (item){
        //     {label: item.name, value: item.name == 'N/A' ? 'queso' : item.id }
        // } )
        console.log('devs name', devs.map(item=> ({label: item.name, value: item.name == 'N/A' ? 'queso' : item.id })))
    }
    

    // funcion de busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
        // console.log(e.target.value)
    }
    async function handleDevSelect(event) {
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
    useEffect( ()=> {
        showData()
    }, [])

    // async function handleDevSelect(event) {
    //     const devId = event.target.value;
    //     // setSelectedDev(devId);
    //     const reportsResponse = await api_service.put('update_report', devId);
    //     // setReports(reportsResponse);
    // }


    //render
    return( 
        
        <div class="container mt-4">
        <h1>Vista de lista de bugs</h1>
        <hr />
        {/* <input id="search" type="text" onChange={handleSearch} placeholder="Buscar por nombre de bug" /> */}
        <div class= "container mt-4"><input className="search-bar" type="search" class="form-control" value={search} onChange={searcher} placeholder="Buscar por nombre de bug" /></div>
        <br /> <br />
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
                        <td>{val.id}</td>
                        <td>{val.title}</td>
                        <td>{val.software}</td>
                        <td>{val.user_id}</td>
                        {/* <td>fecha</td> */}
                        {/* <td>{val.description}</td> */}
                        <td>{val.urgency}</td>
                        <td><BotonEditar/>{val.dev_id}</td>
                        <td>{val.state}</td>
                        <td><BotonBorrar/></td>
                       
                         {/* falta agregar saltos de linea para cada depurador */}
                       
                        <div className='Devs-container' style={{ width: '300px' }}>
                        <p>{selectedDev}</p>

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

export default AdminView
