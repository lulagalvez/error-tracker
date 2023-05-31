import React from 'react'

export const CambiarEstado = ({cambiarId,cambiarStatus,clickFunction}) => {
  return (
    <div>
      <p>
            Cambiar estado: -
            <input type="text" onChange={e => cambiarId(e.target.value)} placeholder='ID'/>
            <select onChange={e => cambiarStatus(e.target.value)}>
                <option value="">--Seleccione una opcion--</option>
                <option value="Cerrado">Cerrado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Solicita Reasignar">Solicita Reasignar</option>
                <option value="Testing">Testing</option>
            </select>
            <button onClick={clickFunction}>Cambiar</button>
      </p>
    </div>
  )
}

