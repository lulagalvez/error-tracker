import React from 'react'

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
    </>
}

export default ProgressBarSoftware