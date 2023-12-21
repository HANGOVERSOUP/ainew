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
import Stack from '@mui/material/Stack';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';


export default function AxisWithComposition({file,fileque}) {
    const[chartType, setChartType] = React.useState('긍정');
    const[chartdata,setchartdata] =useState();
    const[chartlabel,setchartlabel] =useState();
    const[chartdata_neg,setchartdata_neg] =useState();
    const[chartlabel_neg,setchartlabel_neg] =useState();

    const[renderstate,setrenderstate] =useState(0);
    const handleChartType = (event, newChartType) => {
        if (newChartType !== null) {
          setChartType(newChartType);
        }
    };
    // console.log("barline11",file);
    // console.log("barline11",fileque);

    useEffect(() => {
        // console.log("bar_fileque",fileque);
        mkchart_bar();
    }, [file,fileque]);

    const mkchart_bar = async () => {
        if (fileque === undefined){
            return;
        }
        const params = {
            p_name: file,
            question: fileque,
            graph_type: 'bar',
            top_n: '10',
            
        };
        const queryString = new URLSearchParams(params).toString();
        const chartDataUrlNeg = `http://115.68.193.117:9999/net/simple-graph?${queryString}&emotion=부정,`
        const chartDataUrlPos = `http://115.68.193.117:9999/net/simple-graph?${queryString}&emotion=긍정,`

        const responsePos = await axios.get(chartDataUrlPos);
        let temp =Object.keys(responsePos).map(key => responsePos[key]);
        const temp2 = temp[0]
        const uData = temp2.datasets[0].data
        const xLabels = temp2.labels
        setchartdata(uData);
        if (xLabels.length > 0){
            setchartlabel(xLabels);
        }

        const responseNeg = await axios.get(chartDataUrlNeg);
        let temp3 =Object.keys(responseNeg).map(key => responseNeg[key]);
        const temp4 = temp3[0]
        const uData2 = temp4.datasets[0].data
        const xLabels2 = temp4.labels

        setchartdata_neg(uData2);
        if (xLabels2.length > 0){
            setchartlabel_neg(xLabels2);
        }
        setrenderstate(1)
    };

    return (
        <>
        {renderstate ===1 && (
        <>
        <Stack
        direction={{ xs: 'column', xl: 'row' }}
        spacing={1}
        sx={{ width: '100%' }}
        >
            <Box sx={{ width: '100%', maxWidth: 1000}}>
            { chartdata && (
                <>
                <ToggleButtonGroup
                    value={chartType}
                    exclusive
                    onChange={handleChartType}
                    aria-label="chart type"
                    fullWidth
                >
                    {['긍정', '부정'].map((type) => (
                        <ToggleButton key={type} value={type} aria-label="left aligned">
                        {type}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
                {chartType === '긍정' && (
                    <>
                    {chartdata && (
                        <>
                        {chartlabel && (
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
                                    
                                    curve: "linear",
                                    type: 'line',
                                    id: 'revenue',
                                    yAxisKey: 'money',
                                    data: chartdata,
                                    color:'#E48586'                    
                                },
                                {
                                    type: 'bar',
                                    id: 'cookies',
                                    yAxisKey: 'quantities',
                                    data: chartdata,
                                    color:'#2196F3'
                                },
                                ]}
                                // width={1500}
                                height={590}
                                margin={{ left: 50, right: 50 }}
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
                                <ChartsYAxis axisId="quantities" label="" />
                            </ResponsiveChartContainer>
                        )}
                        </>
                    )}
                    </>
                )}
                {chartType === '부정' && (
                    <>
                    {chartdata_neg && (
                        <>
                        {chartlabel_neg && (
                            <ResponsiveChartContainer
                                xAxis={[
                                {
                                    scaleType: 'band',
                                    data: chartlabel_neg,
                                    id: 'quarters',
                                    label: 'Quarters',  
                                },
                                ]}
                                yAxis={[{ id: 'money' }, { id: 'quantities' }]}
                                series={[
                                {
                                    
                                    curve: "linear",
                                    type: 'line',
                                    id: 'revenue',
                                    yAxisKey: 'money',
                                    data: chartdata_neg,
                                    color:'#2196F3'                    
                                },
                                {
                                    type: 'bar',
                                    id: 'cookies',
                                    yAxisKey: 'quantities',
                                    data: chartdata_neg,
                                    color:'#E48586'
                                },
                                ]}
                                // width={1500}
                                height={590}
                                margin={{ left: 50, right: 50 }}
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
                                <ChartsYAxis axisId="quantities" label="" />
                            </ResponsiveChartContainer>
                        )}
                        </>
                    )}
                    </>
                )}
            </>
            )}
            </Box>
        </Stack>
        </>
        )}
        </>
    );
}
