import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js'

function Dona({ charData }) {
    return (
        <>
        <Doughnut data={charData} />
        <p>Dona</p>
        </>
    )
}

export default Dona