import React,{useEffect, useState} from 'react'
import APIService from '../APIService';
// import SelectDev from '//SelectDev'


function AdminView() {
    const [reports,setReports] =React.useState([])
    const [search, setSearch] = React.useState('');
    const [devs,setDevs] = React.useState([]);
    const apiservice=new APIService();
    
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
    }

    // funcion de busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
        // console.log(e.target.value)
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

    //render
    return( 
        <div>
        <h1>Vista de lista de bugs</h1>
        <hr />
        {/* <input id="search" type="text" onChange={handleSearch} placeholder="Buscar por nombre de bug" /> */}
        <input className="search-bar" type="text" value={search} onChange={searcher} placeholder="Buscar por nombre de bug" />
        <br /> <br />
        <table id="Bugs" border="1">
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Depuradores asignados</th>
                <th>Software</th>
                <th>Estado</th>
                <th>Urgencia</th>
                <th>ID Usuario</th>
            </tr>
            {results.map((val, key) => {
                return (
                    <tr key={key}>
                        <td>{val.id}</td>
                        <td>{val.title}</td>
                        <td>{val.description}</td>
                        <td>{val.dev_id}</td>
                        <td>{val.software}</td>
                        <td>{val.state}</td>
                        <td>{val.urgency}</td> {/* falta agregar saltos de linea para cada depurador */}
                        <td>{val.user_id}</td>
                        {/* <SelectDev/> */}
                    </tr>
                )
            })}
        </table>
    </div>
    )
}

export default AdminView
