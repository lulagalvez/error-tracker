import React from 'react'
import './bugForm.css'

//TODO: investigar acerca de los useState hooks y APIService para futura conexión con Flask API 
export default (props) =>{
    return(
        <div className='crear-bug'>
            <h1 className='titulo'>{props.title}</h1>
            <form>
                <label>Título: </label>
                <input name='title' placeholder='Titulo del ticket' maxLength={30} required></input> 
                <label> Software: </label>
                <select name='software' required> 
                    <option value='1'>Software 1</option>
                    <option value='2'>Software 2</option>
                </select>
                <label> Descripción:</label>
                <textarea name='description' placeholder='Descripción detallada del bug' required></textarea>
                <label> Pasos: </label>
                <textarea name='pasos' placeholder='Pasos detallados para reproducir el bug' required></textarea>
                <style>{` .red {color: red}     .green {color: green}`}</style>
                <button type='submit'> <a>{props.title}</a></button>
            </form>
        </div>
    )

}
