import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Side_bar from "../../newcomp/side_bar";
import Top_select from "../../newcomp/select_que_dash";
import BarChart from '../../components/bar-chart';
import PieChart from '../../components/pie-chart';

export default function Home() {
  const [csvstatus, setCsvStatus] = useState(true);
  const [poschart,setposchart] = useState();
  const [negchart,setnegchart] = useState();
  const [chartData,setChartData] = useState();
  const router = useRouter();

  if (router.query.data===undefined){
      router.query.data = "LG_gram_data"
  }
  const [receivedData,setreceivedData]=useState(router.query.data);

  // 모델실행버튼클릭이벤트
  const runmodel = async (selectfile) => {
    console.log("selectfilaaae",selectfile);
  };

  // 파일명변동이벤트
  const filechanged = async (selectfile) => {
    if(selectfile!=null){
      console.log("변동",selectfile.value);
      setreceivedData(selectfile.value);
    }
  };

  useEffect(() => {
    mkchart();
    mkchart_pie();
  }, []);

  function genchart(){
    mkchart();
    // mkchart_pie();
  }
  const mkchart = async () => {
    // const chartDataUrlPos = `http://115.68.193.117:8000/net/simple-graph?filename=${selectedOptions}&Q_code=${selectedQuestions}&graph_type=sample&emotion=긍정&top_n=${selectedValue_top}`;
    // const chartDataUrlNeg = `http://115.68.193.117:8000/net/simple-graph?filename=${selectedOptions}&Q_code=${selectedQuestions}&graph_type=sample&emotion=부정&top_n=${selectedValue_top}`;
    // const chartDataUrlPos = `http://115.68.193.117:8000/net/simple-graph?filename=${receivedData}&Q_code=B5-2&graph_type=sample&emotion=긍정&top_n=10`;
    const chartDataUrlPos = 'http://115.68.193.117:8000/net/simple-graph?filename=LG_gram_data&Q_code=BQ101_1&graph_type=sample&emotion=긍정&top_n=10';
    // const chartDataUrlNeg = `http://115.68.193.117:8000/net/simple-graph?filename=${receivedData}&Q_code=B5-2&graph_type=sample&emotion=부정&top_n=10`;
    const chartDataUrlNeg = 'http://115.68.193.117:8000/net/simple-graph?filename=LG_gram_data&Q_code=BQ101_1&graph_type=sample&emotion=부정&top_n=10';
    
    console.log("chartDataUrlPos",chartDataUrlPos);
    try {
        const responsePos = await axios.get(chartDataUrlPos);

        console.log("responsePos",responsePos);
        console.log("responsePos.data.datasets[0].data",responsePos.data.datasets[0].data);

        const posdata={
            labels : responsePos.data.labels,
            datasets: [
                {
                    type : 'line',
                    label :'percent',
                    // borderColor: 'rgba(75, 192, 192, 1)',
                    borderColor:'#00000',
                    // backgroundColor:'#00000',
                    borderWidth: 0.5,
                    // fill: true,
                    data: responsePos.data.datasets[0].data,
                    datalabels:{
                        display:false,
                    }
                },
                {
                    type : 'bar',
                    label :'count',
                    borderColor: 'white',
                    borderWidth: 2,
                    backgroundColor: 'rgba(121,173,210, 0.7)',
                    data: responsePos.data.datasets[1].data,
                }
            ]
        }
        setposchart(posdata);



        const responseNeg = await axios.get(chartDataUrlNeg);
        console.log("responseNeg",responseNeg);
        console.log("responseNeg.data.datasets[0].data",responseNeg.data.datasets[0].data);

        const negdata={
            labels : responseNeg.data.labels,
            datasets: [
                {
                    type : 'line',
                    label :'percent',
                    borderColor:'#00000',
                    borderWidth: 0.5,
                    fill: false,
                    data: responseNeg.data.datasets[0].data,
                    datalabels:{
                        display:false,
                    }
                },
                {
                    type : 'bar',
                    label :'count',
                    borderColor: 'white',
                    borderWidth: 2,
                    backgroundColor:  "#F78181" ,
                    data: responseNeg.data.datasets[1].data,
                }
            ]
        }
        setnegchart(negdata);

    } catch (error) {
        // console.error('Error fetching chart data:', error);
        // setChartData2(null);
    }    
  };

  const mkchart_pie = async () => {

    setChartData(null);
    // const chartDataUrl = `http://115.68.193.117:8000/net/simple-graph?filename=${selectedOptions}&Q_code=${selectedQuestions}&graph_type=pie&top_n=${selectedValue_top}`;
    const chartDataUrl = `http://115.68.193.117:8000/net/simple-graph?filename=LG_gram_data&Q_code=BQ101_1&graph_type=pie&top_n=10`;
    console.log("chartDataUrl",chartDataUrl);
    try {
        const response = await axios.get(chartDataUrl);
        const chartDataJson = response.data.chartdata; 
        setChartData(chartDataJson);
        // setpietotal(response.data.total);

    } catch (error) {
        console.error('Error fetching chart data:', error);
        setChartData(null);
    }

  };

    const renderChart_pos = () => {
        // 데이터가 유효한 경우에만 차트 렌더링
        if (poschart && poschart.datasets && poschart.datasets.length > 0) {

          return <BarChart data={poschart} height={340} title={'긍정'} /> ;

        } else {
        }
    };
    const renderChart_neg = () => {
      // 데이터가 유효한 경우에만 차트 렌더링
      if (negchart && negchart.datasets && negchart.datasets.length > 0) {

        return <BarChart data={negchart} height={340} title={'부정'} /> ;

      } else {
      }
    };
    const renderChart_pie = () => {
      // 데이터가 유효한 경우에만 차트 렌더링
      if (chartData && chartData.datasets && chartData.datasets.length > 0) {

        return <PieChart data={chartData} height={400}/>;
        // pietotal={pietotal}

      } else {
      }
    };


  const i=4;
  const page=2;
  return (
    //1번 프레임 
    <div id='outter_frame1'>
      {/* 왼쪽 바 */}
      <div id ='left_bar'>
        <Side_bar index={i}/>
      </div>
      {/* 2번 프레임 */}
      <div id='outter_frame2'>
          {/* <TopLabel activeStep={activeStepVal}/> */}
          <Top_select method2={filechanged} method={genchart} page={page} routed={receivedData}/>
          

          {/* 메인: 선택지 , 차트내용 등 */}
          <div id='main_frame'>
            {/* <AuthCheck> */}
            <div className='onlyflex' id='chart_contain'>
                <div id='chart_pie'>
                  {renderChart_pie()}
                </div>

                <div id='chart_bars'>
                  {renderChart_pos()}
                  {renderChart_neg()}
                </div>


            </div>
            {/* </AuthCheck> */}
            {/* 메인: 선택지 , 차트내용 등 */}              
          </div>
      </div>
    </div>
  );
}
