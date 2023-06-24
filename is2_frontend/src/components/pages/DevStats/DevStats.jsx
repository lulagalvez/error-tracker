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
    const dev_email = Cookies.get('email');
    const [datosDevReport, setDatosDevReport] = useState([]);
    const [datosSW, setDatosSW] = useState([]);
    const api_service = new APIService();

    const getData = async () => {
        try {
            const devCountResponse = await api_service.get('count_reports', dev_email);

            setDatosDevReport(devCountResponse);

            const devSW = await api_service.get('count_reports_by_software', dev_email);
            setDatosSW(devSW);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const datosDona = {
        labels: Object.keys(datosDevReport),
        datasets: [
            {
                label: "Job Status Report",
                data: Object.values(datosDevReport),
                backgroundColor: ["#ff6961", "#84b6f4", "#fdfd96", "#77dd77"]
            },
        ],
    }

    return <>
        <div className="container" style={{ "paddingLeft": "150px" }}>
            <div className="row">
                <div className="col border border-1 position-relative">
                    <div style={{ padding: "24px" }}>
                        <h4 className="position-absolute top-0 start-0" >Job Status Report</h4>
                        <Dona charData={datosDona} />
                    </div>
                </div>
                <div className="col  border border-1 position-relative">
                    <SoftwareCompletition softwareData={datosSW} />
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