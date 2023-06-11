import React from 'react'
import { useState } from 'react'
import ProgressBarSoftware from './ProgressBarSoftware'
import { Button } from 'bootstrap'

const pageSize = 5  // number of items per page

function SoftwareCompletition({ softwareData }) {
  var pages = []
  if (softwareData) {
    const totalPages = Math.ceil(softwareData.length / pageSize)
    var iter = 0
    var remainingItems = softwareData.length
    for (var i = 0; i < totalPages; i++) {
      pages.push([])
      var thisPageSize = Math.min(pageSize, remainingItems)
      for (var j = 0; j < thisPageSize; j++) {
        pages[i][j] = <ProgressBarSoftware name={softwareData[iter].name} jobsDone={softwareData[iter].jobsDone} totalJobs={softwareData[iter].totalJobs} />
        iter++
      }
      remainingItems -= pageSize
    }
  }

  const [selectedIndex, setSelectedIndex] = useState(0)

  const previous = () => {
    const condition = selectedIndex > 0
    const nextIndex = condition ? selectedIndex - 1 : pages.length - 1
    setSelectedIndex(nextIndex)
  }

  const next = () => {
    const condition = selectedIndex < pages.length - 1
    const nextIndex = condition ? selectedIndex + 1 : 0
    setSelectedIndex(nextIndex)
  }

  return <>

    {!softwareData || softwareData.length === 0 ? <p>No hay data para mostrar</p>
      :
      <div className="container d-flex flex-column justify-content-between h-100 p-2">
        <div className='d-flex justify-content-between mb-3'>
          <h3 className='fw-bold fs-6 text'>Software Completition</h3>
          <span>See All</span>
        </div>

        <div className='d-flex flex-column justify-content-between flex-grow-1'>
          <div>
            {pages[selectedIndex].map((sw) => sw)}
          </div>

          <div className='d-flex align-items-end'>
            <button onClick={previous}>{"<"}</button>
            <button onClick={next}>{">"}</button>
          </div>
        </div >
      </div>
    }

  </>
}

export default SoftwareCompletition