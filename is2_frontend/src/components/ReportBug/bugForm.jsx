import React, {useState} from 'react'
import './bugForm.css'
import BugModel from '../../models/bugModel';
import APIService from '../APIService';
//TODO: investigar acerca de los useState hooks y APIService para futura conexión con Flask API 
//TODO: arreglar bugModel para que no quede undefined 
/*

*/

export default (props) =>{
    const[bugProps,setBugProps] =useState({titulo:"", detalles:"",pasos:"",software:1})

    const reportBug= () =>{
        APIService.getAPIServiceInstance().post('reports',{title: bugProps.titulo, description: bugProps.detalles ,date:Date.now()})
        .then((response) => props.insertedReport(response))
        .catch(error => console.log('error',error))
    }

    function inputChanged(e){
        setBugProps({
            ...bugProps,
            [e.target.name]:e.target_value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        reportBug();

    }


    
    return(
        <div className='crear-bug'>
            <h1 className='titulo'>{props.title}</h1>

            <form onSubmit={handleSubmit} >
                <label>Título: </label>
                <input name='titulo' placeholder='Titulo del ticket' maxLength={30} required
                 onChange={inputChanged} value={bugProps.titulo} ></input> 
                <label> Software: </label>
                <select name='software' required onChange={inputChanged} value={bugProps.software} > 
                    <option value='1'>Software 1</option>
                    <option value='2'>Software 2</option>
                </select>
                <label> Descripción:</label>
                <textarea name='detalles' placeholder='Descripción detallada del bug' required 
                onChange={inputChanged} value={bugProps.detalles} ></textarea>
                <label> Pasos: </label>
                <textarea name='pasos' placeholder='Pasos detallados para reproducir el bug' required
                onChange={inputChanged} value={bugProps.pasos}  ></textarea>
                <style>{` .red {color: red}     .green {color: green}`}</style>
                <button type='submit' > <a>{props.title}</a></button>
            </form>
        </div>
    )

}
