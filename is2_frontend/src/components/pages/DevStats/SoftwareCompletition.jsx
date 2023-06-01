import React from 'react'
import { useState } from 'react'
import ProgressBarSoftware from './ProgressBarSoftware'

const pct = 100

function SoftwareCompletition() {
  return <>
    <div className="container">
      <div className='d-flex justify-content-between mb-3'>
        <h3 className='fw-bold fs-6 text'>Job Status Report</h3>

        <span>See All</span>
      </div>

      <div className="d-flex flex-column mb-3 gap-3">
        <div className="d-flex justify-content-between align-items-center gap-2">
          <div className='d-flex gap-3'>
            <span>imagen</span>
            <div className="d-flex flex-column">
              <span className='fw-bold'>Software 1</span>
              <span className='text-secondary'>7/10 jobs</span>
            </div>
          </div>


          <div className="progress flex-grow-1 position-relative" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{
            'height': '40px',
            'borderRadius': '30px'
          }}>
            <span className='position-absolute top-50 start-50 translate-middle text-white fs-5'>70%</span>
            <div className="progress-bar" style={{
              width: '70%',
              'backgroundColor': '#34C759',
              'borderRadius': '30px'
            }}></div>
          </div>

        </div>
      </div>
    </div >
  </>
}

export default SoftwareCompletition