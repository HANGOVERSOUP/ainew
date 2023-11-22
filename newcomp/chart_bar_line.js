import * as React from 'react';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import {useEffect, useState } from 'react';
import axios from 'axios';


export default function AxisWithComposition() {

    const[chartdata,setchartdata] =useState();
    const[chartlabel,setchartlabel] =useState();

    useEffect(() => {
        mkchart_bar();
      }, []);

    const mkchart_bar = async () => {
        const que= "B8-2.%E2%80%9CJammy%28%EC%9E%AC%EB%AF%B8%29%E2%80%9D%EC%82%AC%EC%9D%B4%ED%8A%B8%20%EC%B6%94%EC%B2%9C%20%EC%9D%98%ED%96%A5%EC%9D%B4%20%EB%B3%B4"
        +"%ED%86%B5%EC%9D%B4%EA%B1%B0%EB%82%98%20%EC%B6%94%EC%B2%9C%ED%95%98%EC%A7%80%20%EC%95%8A"
        +"%EB%8A%94%20%EC%9D%B4%EC%9C%A0%EB%8A%94%20%EB%AC%B4%EC%97%87%EC%9E%85%EB%8B%88%EA%B9%8C%3F";
        const p_name = "2302019_A_%282023-11-03";

        const chartDataUrlNeg = `http://115.68.193.117:9999/net/simple-graph?p_name=${p_name}%29&graph_type=sample&emotion=부정&top_n=10&Q_code=${que}`
        const chartDataUrlPos = `http://115.68.193.117:9999/net/simple-graph?p_name=${p_name}%29&graph_type=sample&emotion=긍정&top_n=10&Q_code=${que}`

        try {
            const responsePos = await axios.get(chartDataUrlPos);

            console.log("responsePos",responsePos);
            let temp =Object.keys(responsePos).map(key => responsePos[key]);
            const temp2 = temp[0]
            const dataArray = Array.from(temp2);
            console.log("dataArray",dataArray);

            const uData = dataArray.map(item => item.id); 
            const xLabels = dataArray.map(item => item.net_text);
            console.log("uData",uData);
            console.log("xLabels",xLabels);

            setchartdata(uData);
            setchartlabel(xLabels);

        } catch (error) {
            console.error('바랑라인에러', error);
        }    
    };

    // chartlabel
    // chartdata
  return (

    <Box sx={{ width: '100%', maxWidth: 600 }}>
        {chartdata && (
            <ResponsiveChartContainer
                xAxis={[
                {
                    scaleType: 'band',
                    data: chartlabel,
                    id: 'quarters',
                    label: 'Quarters',  
                },
                ]}
                yAxis={[{ id: 'money' }, { id: 'quantities' }]}
                series={[
                {
                    type: 'line',
                    id: 'revenue',
                    yAxisKey: 'money',
                    data: chartdata,
                    color:'#f28e2c'                    
                },
                {
                    type: 'bar',
                    id: 'cookies',
                    yAxisKey: 'quantities',
                    data: chartdata,
                    color:'#4e79a7'
                },
                ]}
                height={400}
                margin={{ left: 70, right: 70 }}
                sx={{
                [`.${axisClasses.left} .${axisClasses.label}`]: {
                    transform: 'translate(-25px, 0)',
                },
                [`.${axisClasses.right} .${axisClasses.label}`]: {
                    transform: 'translate(30px, 0)',
                },
                }}
            >
                <BarPlot />
                <LinePlot />
                <ChartsXAxis axisId="quarters" label="NET" labelFontSize={18} />
                <ChartsYAxis axisId="quantities" label="이ㅏ름뭐로" />
            </ResponsiveChartContainer>

        )}
    </Box>
  );
}
