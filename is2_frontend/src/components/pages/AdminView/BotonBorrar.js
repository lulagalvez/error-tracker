import React from 'react'
import './BotonBorrar.css'

export const BotonBorrar = ({deleteReport, report}) => {
  return (
    <button type="button" className="btn bg-transparent" onClick={() => deleteReport(report)}>
        <i class="bi bi-trash3 color-trash"></i>
    </button>
  )
}

