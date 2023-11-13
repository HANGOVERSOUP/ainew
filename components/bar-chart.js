
import React from 'react';
import ChartDataLabels from "chartjs-plugin-datalabels"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BarChartExample = ({data, width, height,title }) => {
  // Sample data for the bar chart
  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: 'black', // You can customize the color
        anchor: 'end', // You can adjust the label position
      },
    },
    legend: {
      display: false, // Hide the legend
    },
  };
  
  return (
    <div>

      <h3 id ='chart_title'>{title}</h3>
      <div id='inner_bar' style={{ width: `${width}px`, height: `${height}px` }}>
        <Bar data={data} />
      
      </div>
    </div>
  );
};

export default BarChartExample;
