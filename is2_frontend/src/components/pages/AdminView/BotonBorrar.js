import React from 'react'
import './BotonBorrar.css'

export const BotonBorrar = ({deleteFunction}) => {
  return (
    <button type="button" className="btn bg-transparent" onClick={deleteFunction}>
        <i class="bi bi-trash3 color-trash"></i>
    </button>
  )
}
