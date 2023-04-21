import React, {useState} from 'react'
import './bugForm.css'
import APIService from '../APIService';
import Alert from '../Alert';


export default (props) =>{
    const[inputValues,setInputValues] =useState({title:'', description:'',pasos:"",software:1})
    const apiservice=new APIService();
    const reportBug= () =>{
        apiservice.post('reports',{title: inputValues.title, description: inputValues.description, user_id: 1,dev_id: 1})
        .then(response =>{
            if(response.message=== 'Reporte creado'){
                alert(response.message)
            }
            else{
                alert('Error, reporte no enviado')
            }
        })
        .catch(error => console.log('error',error))
    }

    const handleOnChange = event =>{
        const {name,value} =event.target;
        setInputValues({
            ...inputValues,
            [name]:value
        });
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        reportBug();
    }


    
    return(
        <>
        <div className='crear-bug'>
        
            <h1 className='titulo'>{props.title}</h1>
            
            <form onSubmit={handleSubmit} >
                <label>Título: </label>
                <input name='title' placeholder='Titulo del ticket' maxLength={30} required
                 onChange={handleOnChange} value={inputValues.title} ></input> 
                <label> Software: </label>
                <select name='software' required onChange={handleOnChange} value={inputValues.software } > 
                    <option value='1'>Software 1</option>
                    <option value='2'>Software 2</option>
                </select>
                <label> Descripción:</label>
                <textarea name='description' placeholder='Descripción detallada del bug' required 
                onChange={handleOnChange} value={inputValues.description } ></textarea>
                <label> Pasos: </label>
                <textarea name='pasos' placeholder='Pasos detallados para reproducir el bug' required
                onChange={handleOnChange} value={inputValues.pasos }  ></textarea>
                <style>{` .red {color: red}     .green {color: green}`}</style>
                <button type='submit' > <a>{props.title}</a></button>
            </form>
        </div>
        </>
    )

}
