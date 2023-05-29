import React, { useEffect, useRef } from 'react'
import './OverdueWork.css'
function OverdueWork() {

    return <>
        <div class='progress'>
            <div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" ></div>
        </div>

        <div className='overduework'>
            <div class="progress yellow">
                <span class="progress-left">
                    <span class="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" ></span>
                </span>
                <span class="progress-right">
                    <span class="progress-bar"></span>
                </span>
                <div class="progress-value">75%</div>
            </div>
        </div >

    </>
}

export default OverdueWork
