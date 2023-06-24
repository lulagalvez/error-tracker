import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Colors } from 'chart.js';

// Chart.register(Colors);

function Dona({ charData }) {
    return (
        <>
            <Doughnut data={charData} />
        </>

    )
}

export default Dona