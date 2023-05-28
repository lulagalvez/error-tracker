import React from 'react'
import { useState } from 'react'
import { JobStatusData } from './Data'
import ProgressBarSoftware from './ProgressBarSoftware'

const pct = 100

function SoftwareCompletition() {
    return <>
        <div class="container">
            <div class="row">
                <div class="col bg-transparent text-dark badge bg-primary text-wrap width: 6rem;">
                    <p>Software1</p>
                    <p>7/10 job done</p>
                </div>
                <div class="col-3 bg-warning">
                    <p>75%</p>
                    <p>7/</p>
                </div>
            </div>
        </div>
    </>
}

export default SoftwareCompletition