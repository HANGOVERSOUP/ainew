import * as React from 'react';
import {useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { ThemeContext } from '/home/aibd/webtest/hb/hb/styles/ThemeContext.js'; 
import  { useContext } from 'react';

const ff = [
  '#E2EDEB', '#E0F3F7', '#B8BDDE', '#ABDAE2', '#CEEDED', '#7FC6D7',
  '#F5F8F9', '#DFEEF3', '#C9E1E6', '#CEEAF6', '#E2F1F7', '#C4E2EA',
  '#F3FDFE', '#DAF1FE', '#C4E5FB', '#9BC7EC', '#ADF6F8', '#C1DDF3',
  '#D1EAF7', '#B5E4F6', '#BBD7F0', '#97D0E7', '#66C0DC', '#AAD8EB',
  '#D8DAE3', '#E3E8EF', '#C5D9DF', '#D4E2E9', '#ADF6EF', '#C0C8D9',
  '#E4C4FE', '#CEE5F6', '#A4C6EB', '#D3E5F8', '#A8DFB6', '#A3BEDD',
  '#F1FBFD', '#E8F4FF', '#D1E2F5', '#C5D6F0', '#D4D9EF', '#BBCEF0',
  '#EDF3FF', '#E4ECFC', '#D1DDF8', '#BFCAE2', '#AEBAD2'
];
const f = [
  '#004B57', '#006A89', '#007AA2', '#008DC0', '#009DCF',
  '#003F5D', '#00527C', '#00609C', '#006DB2', '#4E97D1',
  '#002F5C', '#004987', '#004F92', '#00569D', '#3E77B6',
  '#002A5E', '#003777', '#003B85', '#003A88', '#6C85BD',
  '#001A5F', '#00216D', '#002A7C', '#002D82', '#5B61A1'
];
const paletteDark = [
  "#4DB6AC", // 틸, 보다 더 어두운 톤
  "#4FC3F7", // 라이트 블루, 선명하지만 너무 밝지 않은 톤
  "#FFD54F", // 암바, 어두운 배경에 대비되는 밝은 색상
  "#E57373", // 레드, 더 어두운 레드 톤으로 가독성 향상
  "#F06292", // 핑크, 어두운 배경에 잘 보이는 밝은 톤
  "#BA68C8", // 퍼플, 더욱 진한 색으로 변경
  "#9575CD", // 딥 퍼플, 어두운 테마에 맞게 조정
  "#7986CB", // 인디고, 어두운 테마에 적합한 중간 톤
  "#64B5F6", // 블루, 밝지만 다크 테마에 적합하게 조정
  "#4DD0E1", // 시안, 다크 테마에 잘 어울리는 밝은 색상
  "#DCE775", // 라임, 어두운 배경에 대비되는 선명한 색상
  "#AED581", // 라이트 그린, 다크 테마에 적합하게 조정
  "#FF8A65", // 딥 오렌지, 어두운 배경에 잘 드러나는 색상
  "#A1887F", // 브라운, 가독성을 위해 조금 밝게 조정
  "#90A4AE"  // 블루 그레이, 어두운 배경에 잘 어울리는 톤
];

const paletteLight = [
  "#87CEEB", // 하늘색
  "#17A2B8", // 청록색
  "#0D47A1", // 진한 파랑
  "#82B1FF", // 라이트 블루
  "#4682B4", // 스틸 블루
  "#5F9EA0", // 캐딜락 블루
  "#6495ED", // 콘플라워 블루
  "#7B68EE", // 중간 진한 파랑
  "#1E90FF", // 도저 블루
  "#00BFFF", // 딥 스카이 블루
  "#ADD8E6", // 라이트 블루
  "#4169E1", // 로얄 블루
  "#6A5ACD", // 슬레이트 블루
  "#20B2AA", // 라이트 시 블루
  "#191970"  // 미드나잇 블루
];


function PieAnimation({file,fileque}) {
  const { mode } = useContext(ThemeContext); 
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
        colors={mode === 'light' ? paletteLight : paletteDark}
        // colors={palette1}
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
        sx={{ '& text': { fill: mode === 'light' ? 'white' : '#333333' , fontWeight : 'bold' ,} }}
        
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