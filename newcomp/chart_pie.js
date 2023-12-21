import * as React from 'react';
import {useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';

// const palette = [
//   '#E2EDEB', '#E0F3F7', '#B8BDDE', '#ABDAE2', '#CEEDED', '#7FC6D7',
//   '#F5F8F9', '#DFEEF3', '#C9E1E6', '#CEEAF6', '#E2F1F7', '#C4E2EA',
//   '#F3FDFE', '#DAF1FE', '#C4E5FB', '#9BC7EC', '#ADF6F8', '#C1DDF3',
//   '#D1EAF7', '#B5E4F6', '#BBD7F0', '#97D0E7', '#66C0DC', '#AAD8EB',
//   '#D8DAE3', '#E3E8EF', '#C5D9DF', '#D4E2E9', '#ADF6EF', '#C0C8D9',
//   '#E4C4FE', '#CEE5F6', '#A4C6EB', '#D3E5F8', '#A8DFB6', '#A3BEDD',
//   '#F1FBFD', '#E8F4FF', '#D1E2F5', '#C5D6F0', '#D4D9EF', '#BBCEF0',
//   '#EDF3FF', '#E4ECFC', '#D1DDF8', '#BFCAE2', '#AEBAD2'
// ];
const palette = [
  '#004B57', '#006A89', '#007AA2', '#008DC0', '#009DCF',
  '#003F5D', '#00527C', '#00609C', '#006DB2', '#4E97D1',
  '#002F5C', '#004987', '#004F92', '#00569D', '#3E77B6',
  '#002A5E', '#003777', '#003B85', '#003A88', '#6C85BD',
  '#001A5F', '#00216D', '#002A7C', '#002D82', '#5B61A1'
];

function PieAnimation({file,fileque}) {
  const [itemNb, setItemNb] = React.useState(3);
  const [chartdata , setChartData] = React.useState();


  useEffect(() => {
    mkchart_pie();
  }, [file,fileque]);

  const mkchart_pie = async () => {
    // console.log("chart_pie_file",file);
    // console.log("chart_pie_fileque",fileque);
    const params = {
        p_name: file,
        question: fileque,
        graph_type: 'pie',
        top_n: '25'
    };
    const queryString = new URLSearchParams(params).toString();
    const chartDataUrl = `http://115.68.193.117:9999/net/simple-graph?${queryString}`
    try {
      const response = await axios.get(chartDataUrl);
      let temp =Object.keys(response).map(key => response[key]);
      const temp2 = temp[0];

      // console.log("chart_pie_response",response);

      setChartData(temp2);
    } catch (error) {
        console.error('Error fetching chart data:', error);
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
        colors={palette}
        width={780}
        height={500}
        series={[
          // { data: data1, outerRadius: radius },
          {
            data : chartdata.slice(0,itemNb),
            innerRadius: 70,
            outerRadius: 250,
            arcLabel: (params) => params.label ?? '',
            arcLabel: (item) => `${item.label} (${item.value})`,
            // 작은거 지워지게
            arcLabelMinAngle: 30,
            highlightScope: { faded: 'global', highlighted: 'item' },
            // highlighted: { additionalRadius: 10 },
            margin: { top: 50, bottom: 50 },
          }
          
        ]}
        sx={{ '& text': { fill: 'white' } }}
        
        tooltip={{ followCursor: true}}
      />
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
      </>
      )}
    </Box>
  );
}
export default PieAnimation;