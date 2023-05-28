import React from 'react'
import './ProgressBarSoftware.css'

const pct = 10
const softwareName = "Software 1"

function ProgressBarSoftware() {
    return <>
        <div class="row align-items-end">
            <div class="col bg-success">
                One of three columns
            </div>
            <div class="progress" style={{ "height": "20px", }}>
                <div class="progress-bar" role="progressbar" style={{ "width": 100, "aria-valuenow": "25", " aria-valuemin": "0", "aria-valuemax": "100" }}></div>
            </div>
        </div>
        {/* <div class="row g-0 p-2">
            <div class="col border border-1 position-relative">
                {softwareName}
                <span>hello</span>
            </div>
            <div class="col-3 pt-2 pb-2 border border-1 position-relative">
                <div class="w-100">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ "width": pct + "%", "background": "green", "aria-valuenow": pct, "aria-valuemin": "0", "aria-valuemax": "100" }}> {pct} </div>
                        <div class="progress-bar" role="progressbar" style={{ "width": 100 - pct + "%", "background": "black", "aria-valuenow": pct, "aria-valuemin": "0", "aria-valuemax": "100" }}> </div>
                    </div>
                </div>
            </div>
        </div> */}
    </>
    // return <>
    //     <div class="col-md border border-1 position-relative">
    //     </div>
    //     <div class="col-md border border-1 position-relative">

    //     </div>
    // </>
}

export default ProgressBarSoftware