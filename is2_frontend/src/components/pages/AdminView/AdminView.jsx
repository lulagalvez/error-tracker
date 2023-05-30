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

    const [num,setNum]=useState(0);
    const [idP,setIdP]=useState("");
    const [idE,setIdE]=useState("");
    const [estado,setEstado]=useState("");
    const [bugs,setBugs]=useState(results);
    const cambiarNum=(nuevo)=>{
      setNum(nuevo);
    }
    const cambiarIdP=(nuevo)=>{
      setIdP(nuevo);
    }
    const cambiarIdE=(nuevo)=>{
      setIdE(nuevo);
    }
    const cambiarEstado=(nuevo)=>{
      setEstado(nuevo);
    }
    const copiaArray=()=>{
        var newArray=[];
        bugs.map((bug)=>{
            if(bug!==undefined) newArray.push(bug);
        })
        return newArray;
    }
    const getPos=(bug_id,array)=>{
        for(var i=0;i<array.length;i++){
            if(bug_id.startsWith(array[i].id)) return i;
        }
        return -1;
    }
    const setPrioridad=(bug_id,nuevaPr)=>{
        var newArray=copiaArray();
        const pos=getPos(bug_id,newArray);
        if(pos==-1) return;
        newArray[pos].urgency=nuevaPr;
        newArray.sort((a,b)=>{
            return a.urgency-b.urgency;
        });
        setBugs(newArray);
    }
    const setStatus=(bug_id,nuevoSt)=>{
        if(nuevoSt=="") return;
        var newArray=copiaArray();
        const pos=getPos(bug_id,newArray);
        if(pos==-1) return;
        newArray[pos].state=nuevoSt;
        setBugs(newArray);
    }
    const deleteBug=(bug_id)=>{
        const newArray=bugs.filter((bug) => bug.id!==bug_id);
        setBugs(newArray);
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
            <p>
            Cambiar prioridad: -
            <input type="text" onChange={e => cambiarIdP(e.target.value)} placeholder="ID"/>
            <input type="number" onChange={e => cambiarNum(e.target.valueAsNumber)} placeholder="Prioridad"/>
            <button onClick={e => setPrioridad(idP,num)}>Cambiar</button>
            </p>
            <p>
            Cambiar estado: -
            <input type="text" onChange={e => cambiarIdE(e.target.value)} placeholder='ID'/>
            <select onChange={e => cambiarEstado(e.target.value)}>
                <option value="">--Seleccione una opcion--</option>
                <option value="Cerrado">Cerrado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Solicita Reasignar">Solicita Reasignar</option>
                <option value="Testing">Testing</option>
            </select>
            <button onClick={e => setStatus(idE,estado)}>Cambiar</button>
            </p>
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
            {bugs.map((val, key) => {
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
                        <td><BotonBorrar deleteFunction={e => deleteBug(val.id)}/></td>
                       
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
