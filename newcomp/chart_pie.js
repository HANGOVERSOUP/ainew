import * as React from 'react';
import {useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';


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

      console.log("chart_pie_response",response);

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