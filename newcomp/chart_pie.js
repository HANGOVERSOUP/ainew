import * as React from 'react';
import {useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import FormControlLabel from '@mui/material/FormControlLabel';

const data2 = [
  { label: '1', value: 100 },
  { label: '2', value: 300 },
  { label: '3', value: 100 },
  { label: '4', value: 80 },
  { label: '5', value: 40 },
  { label: '6', value: 30 },
  { label: '7', value: 50 },
  { label: '8', value: 100 },
  { label: '9', value: 200 },
  { label: '10', value: 150 },
  { label: '11', value: 50 },
];


function PieAnimation() {
    
  const [radius, setRadius] = React.useState(150);
  const [itemNb, setItemNb] = React.useState(3);
  const [chartdata , setChartData] = React.useState();
  const [chart_len, setchart_len]=useState();

  useEffect(() => {
    mkchart_pie();
  }, []);

  const mkchart_pie = async () => {
    // const chartDataUrl = `http://115.68.193.117:8000/net/simple-graph?filename=${selectedOptions}&Q_code=${selectedQuestions}&graph_type=pie&top_n=${selectedValue_top}`;
    // const chartDataUrl = `http://115.68.193.117:9999/net/simple-graph?filename=2302019_A_(2023-11-03)&Q_code=BQ101_1&graph_type=pie&top_n=10`;
    const chartDataUrl = "http://115.68.193.117:9999/net/simple-graph?p_name=2302019_A_%282023-11-03%29&graph_type=pie&top_n=10&Q_code="
    +"B8-2.%E2%80%9CJammy%28%EC%9E%AC%EB%AF%B8%29%E2%80%9D%EC%82%AC%EC%9D%B4%ED%8A%B8%20%EC%B6%94%EC%B2%9C%20%EC%9D%98%ED%96%A5%EC%9D%B4%20%EB%B3%B4"
    +"%ED%86%B5%EC%9D%B4%EA%B1%B0%EB%82%98%20%EC%B6%94%EC%B2%9C%ED%95%98%EC%A7%80%20%EC%95%8A"
    +"%EB%8A%94%20%EC%9D%B4%EC%9C%A0%EB%8A%94%20%EB%AC%B4%EC%97%87%EC%9E%85%EB%8B%88%EA%B9%8C%3F"
    try {
        const response = await axios.get(chartDataUrl);
        console.log("response",response);
        let temp =Object.keys(response).map(key => response[key]);
        const temp2 = temp[0];
        setChartData(temp2);
    } catch (error) {
        console.error('Error fetching chart data:', error);
        setChartData(null);
    }
  };


  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setItemNb(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      
      {chartdata && (
      <>
      <Typography id="input-item-number" gutterBottom>
        전체표기
      </Typography>
      <PieChart
        width={600}
        height={300}
        series={[
          // { data: data1, outerRadius: radius },
          {
            data : chartdata.slice(0,itemNb),
            // innerRadius: radius,
            outerRadius: 150,
            // arcLabel: (params) => params.label ?? '',
            arcLabel: (item) => `${item.label} (${item.value})`,
            // 작은거 지워지게
            // arcLabelMinAngle: 45,

          }
        ]}
      />
      </>
      )}

      <Typography id="input-item-number" gutterBottom>
        top n 조정 
      </Typography>
      <Slider
        value={itemNb}
        onChange={handleItemNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={chartdata ? chartdata.length : 25}
        aria-labelledby="input-item-number"
      />

    </Box>
  );
}
export default PieAnimation;