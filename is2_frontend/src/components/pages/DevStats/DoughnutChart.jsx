import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { Legend } from 'chart.js'

// ChartJS.overrides['doughnut'].plugins.legend = {
//   display: true,
//   position: "bottom",
// };

// ChartJS.register(Legend);
const options = {
  borderWidth: 10,
  borderRadius: 1,
  weight: 0.5,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      boxHeight: 30,
      boxWidth: 5
    }
  },
  backgroundColor: ["green", "blue"]
  // borderDashOffset: 500,
}

function DoughnutChart({ charData }) {
  const plugins = [{
    beforeDraw: function (chart) {
      const width = chart.width;
      const height = chart.height;

      const ctx = chart.ctx;
      ctx.restore();

      const fontSize = (height / 160).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "top";

      const text = "";
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2; // ctx.measureText(text).height

      ctx.fillText(text, textX, textX);
      ctx.save();
    }
  }];

  return (
    <div className='position-relative'>
      <Doughnut data={charData} options={options} plugins={plugins} />
      <span style={{ position: 'absolute', top: '115px', left: '105px' }} className='fs-4'>+99 Jobs</span>
    </div>

  )
}

export default DoughnutChart