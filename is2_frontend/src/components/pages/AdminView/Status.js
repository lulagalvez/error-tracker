import React from 'react'
import './Status.css'

export const Status = ({nombre}) => {
    const mapa={
      "Cerrado":"closed",
      "Pendiente":"pending",
      "Solicita reasignar":"asking-reasign",
      "Testing":"testing"
    }
  return (
    <div class={mapa[nombre]}>{nombre}</div>
  )
}
