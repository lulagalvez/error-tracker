import React,{useState} from 'react'
import {BotonEditar} from './BotonEditar'
import './Buscador.css'

export const Buscador = ({texto,setTexto}) => {
    const arrayDevs=["Sofia Montes","Julio Diaz","Melisa Navarrete","Bruno Padilla","Juan Ramirez"]
    const [devs,setDevs]=useState(arrayDevs);
    //const [texto,setTexto]=useState("???")
    const [buscar,setBuscar]=useState(false);
    const filtrar=(buscar)=>{
        const newArray=arrayDevs.filter((dev) => dev.startsWith(buscar));
        setDevs(newArray);
    }
    const cambiarTexto=(nuevo)=>{
        setTexto(nuevo);
        setVisibilidad();
    }
    const setVisibilidad=()=>{
        var bl=true;
        if(buscar) bl=false;
        setBuscar(bl);
    }
    const mostrarBusqueda=()=>{
        if(buscar){
            return (
                <div>
                    <i class="bi bi-search pos-icono"></i>
                    <input 
                        type="text" 
                        class="pos-texto largo-cuadro" 
                        placeholder='Buscar dev'
                        onChange={e => filtrar(e.target.value)}
                    />
                    <table className="table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Buscar devs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devs.map((dev,k)=>{
                                return (
                                    <tr key={k}><td onClick={e => cambiarTexto(dev)}>{dev}</td></tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )
        }else return (<div></div>)
    }
  return (
    <div>
        <p>
           <BotonEditar showFunction={e => setVisibilidad()}/>{texto}
        </p>
        {mostrarBusqueda()}
    </div>
  )
}
