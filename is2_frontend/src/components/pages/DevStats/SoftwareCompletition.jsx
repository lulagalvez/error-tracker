import React from 'react'
import { useState } from 'react'
import ProgressBarSoftware from './ProgressBarSoftware'

const pct = 100

function SoftwareCompletition() {
  return <>
    <div className="container">
      <div className='d-flex justify-content-between mb-3'>
        <h3 className='fw-bold fs-6 text'>Software Completition</h3>

        <span>See All</span>
      </div>

      <ProgressBarSoftware />
      <ProgressBarSoftware />
      <ProgressBarSoftware />


    </div >

  </>
}

export default SoftwareCompletition