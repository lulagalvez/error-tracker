import React from 'react'
import './Status.css'

export const Status = ({nombre}) => {
    const mapa={
      "Cerrado":"Closed",
      "Pendiente":"Pending",
      "Por asignar":"ToDo",
      "Testing":"Testing"
    }
  return (
    <div class={mapa[nombre]}>{nombre}</div>
  )
}
