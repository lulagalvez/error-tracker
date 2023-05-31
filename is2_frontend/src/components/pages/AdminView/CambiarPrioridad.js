import React from 'react'

export const CambiarPrioridad = ({cambiarId,cambiarQ,clickFunction}) => {
  return (
    <div>
        <p>
            Cambiar prioridad: -
            <input type="text" onChange={e => cambiarId(e.target.value)} placeholder="ID"/>
            <input type="number" onChange={e => cambiarQ(e.target.valueAsNumber)} placeholder="Prioridad"/>
            <button onClick={clickFunction}>Cambiar</button>
        </p>
    </div>
  )
}
