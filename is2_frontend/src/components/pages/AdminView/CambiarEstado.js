import React from 'react'

export const CambiarEstado = ({cambiarId,cambiarStatus,clickFunction}) => {
  return (
    <div>
      <p>
            Cambiar estado: -
            <input type="text" onChange={e => cambiarId(e.target.value)} placeholder='ID'/>
            <select onChange={e => cambiarStatus(e.target.value)}>
                <option value="">--Seleccione una opcion--</option>
                <option value="Closed">Cerrado</option>
                <option value="Pending">Pendiente</option>
                <option value="ToDo">Solicita Reasignar</option>
                <option value="Testing">Testing</option>
            </select>
            <button onClick={clickFunction}>Cambiar</button>
      </p>
    </div>
  )
}

