import React, { useState } from 'react'
// import { JobStatusData } from "./Data";
import DoughnutChart from "./Components/DoughnutChart";
import { Chart as ChartJS } from "chart.js/auto";
import './DevStats.css'
import SoftwareCompletition from './SoftwareCompletition';
import OverdueWork from './OverdueWork.jsx';
function DevStats() {

    const datosPalCirculo = {
        // labels: JobStatusData.map((sw) => sw.name),
        labels: ["closed", "testing", "pending", "to-do"],
        datasets: [
            {
                label: "Job Status Report",
                // data: JobStatusData.reduce(
                //     (acc, cur) => {
                //     acc[0] += cur.closed;
                //     acc[1] += cur.testing;
                //     acc[2] += cur.pending;
                //     acc[3] += cur.to_do;

                //     return acc;
                //     },
                //     [0, 0, 0, 0]
                // ),
                data: [12, 13, 15, 61]
            },
        ],
    }
    return (
        <div class="container" style={{ "padding-left": "150px" }}>
            <div class="row">
                <div class="col border border-1 position-relative">
                    <div style={{ padding: "24px" }}>
                        <h4 class="position-absolute top-0 start-0" >Job Status Report</h4>
                        <DoughnutChart charData={datosPalCirculo} />
                    </div>
                </div>
                <div class="col border border-1 position-relative">
                    <div style={{ padding: "24px" }}>
                        <h4 class="position-absolute top-0 start-0" >Software Completion</h4>
                        <SoftwareCompletition />
                    </div>
                </div>

                <div class="col border border-1 position-relative">
                    <div style={{ padding: "24px" }}>
                        <h4 class="position-absolute top-0 start-0" > Overdue work</h4>
                        <OverdueWork />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DevStats