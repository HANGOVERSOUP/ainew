import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
import ChartDataLabels from "chartjs-plugin-datalabels"

const PieChart = ({ data, pietotal, title,width, height }) => {


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: false
    },

    plugins: {
      customCanvasBackgroundColor: {
        color: 'lightGreen',
      },
      title: {
        display: true,
        text: title,
      },
      legend: { display: true, position: "bottom" },
      datalabels: {
        formatter: function(value) {
          // return context.dataIndex + ': ' + (value*100) + '%';
          return value+'\n'+ 
          Math.round(value/pietotal*100) + '%'

          ;

        }
      }


    },

  };

  return (
    <div>
      <div id='pie_back' style={{ width: `${width}px`, height: `${height}px` }}>
        <div id='pie_total'>Total = {pietotal}</div>
        <Pie data={data} options={options}/>
        

      </div>
    </div>
  );
};

export default PieChart;
