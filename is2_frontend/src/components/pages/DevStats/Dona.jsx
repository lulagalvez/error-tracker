import React from 'react'
import { Doughnut } from 'react-chartjs-2'

function Dona({ charData }) {
    return (
        <>
            <Doughnut data={charData} />
            <p>Dona</p>
        </>

    )
}

export default Dona