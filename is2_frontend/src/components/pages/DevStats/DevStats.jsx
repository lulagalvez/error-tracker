import React, { useState, useEffect, useRef } from 'react'
import DoughnutChart from "./DoughnutChart";
import { Chart as ChartJS } from "chart.js/auto";
// import './DevStats.css'
import SoftwareCompletition from './SoftwareCompletition';
import OverdueWork from './OverdueWork';
import Dona from './Dona';
import APIService from '../../services/APIService';
import Cookies from 'js-cookie';

function DevStats() {
    const devId = Cookies.get('id');
    const dev_email = Cookies.get('email');
    const [datosDevReport, setDatosDevReport] = useState([]);
    const api_service = new APIService();
    let dataStatus = useRef([]);
    let completeness = useRef(0);

    const showData = async () => {
        try {
            const devReportsResponse = await api_service.get('dev_reports', dev_email);
            console.log("showData", devReportsResponse)
            setDatosDevReport(devReportsResponse);
            console.log("showData2", datosDevReport)
            getStatus()
        } catch (error) {
            console.error("Error fetching data:", error);
          }
    }

    async function getStatus() {
        let toDoCount = 0;
        let pendingCount = 0;
        let testingCount = 0;
        let closedCount = 0;
        let datos = [toDoCount, pendingCount, testingCount, closedCount];
        console.log("jajitas")
        console.log("getStatus", datosDevReport)
        for (var report in datosDevReport) {
            console.log("status", report)
            if (report.status) {
                switch (report.status) {
                    case 'ToDo':
                        toDoCount = toDoCount + 1;
                        break;
                    case 'Pending':
                        pendingCount = pendingCount + 1;
                        break;
                    case 'Testing':
                        testingCount = testingCount + 1;
                        break;
                    case 'closedCount':
                        closedCount = closedCount + 1;
                        break;
                }
            }
        }
        return datos;
    }

    async function getCompleteness() {
        if (dataStatus) {
            completeness.current = dataStatus[3] / (dataStatus[0] + dataStatus[1] + dataStatus[2] + dataStatus[3])
            completeness.current = completeness.current * 100;
        }
    }

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await api_service.get('dev_reports', devId);
    //         setDatosDevReport(response);
    //         // console.log(response);
    //     };
    //     fetchData();
    //     dataStatus.current = getStatus();
    //     getCompleteness();
    //     // console.log(datosDevReport);
    // }, []);

    

    // console.log(datosDevReport)

    useEffect(() => {
        showData();
        // getStatus();
      }, []);

    const [datosDona, setDatosDona] = useState({
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
    })

    const dummySW = [
        {
            name: "Software 1",
            jobsDone: 8,
            totalJobs: 11
        },
        {
            name: "Software 2",
            jobsDone: 62,
            totalJobs: 99
        },
        {
            name: "Software 3",
            jobsDone: 0,
            totalJobs: 0
        },
        {
            name: "Software 4",
            jobsDone: 12,
            totalJobs: 17
        },
        {
            name: "Software 5",
            jobsDone: 12,
            totalJobs: 17
        }
    ]

    return <>
        <div className="container" style={{ "paddingLeft": "150px" }}>
            <div className="row">
                <div className="col border border-1 position-relative">
                    <div style={{ padding: "24px" }}>
                        <h4 className="position-absolute top-0 start-0" >Job Status Report</h4>
                        {/* <DoughnutChart charData={datosDona} /> */}
                        <Dona charData={datosDona} />
                    </div>
                </div>
                <div className="col  border border-1 position-relative">
                    <SoftwareCompletition softwareData={dummySW} />
                </div>

                <div className="col border border-1 position-relative">
                    <div style={{ padding: "24px" }}>
                        <h4 className="position-relative top-0 start-0" > Overdue work</h4>
                        <OverdueWork percentageProgress='24' />
                    </div>
                </div>
            </div>
        </div>


    </>
}

export default DevStats