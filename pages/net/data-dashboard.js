import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import TemporaryDrawer from "../../components/menu_direct_drawer";
import HorizontalLinearStepper from "../../components/stepper";
import axios from 'axios';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Select_q from "../../components/select";
import PieChart from '../../components/pie-chart';
import BarChart from '../../components/bar-chart';
import RowRadioButtonsGroup from '../../components/radoi';

export default function Home() {
    const [chartData,setChartData]=useState(null);
    const [ pietotal ,setpietotal] = useState(null);
    const router = useRouter();    

    if (router.query.data===undefined){
        router.query.data = "LG_gram_data"
    }
    const received = router.query.data;
    let cleanedString = received.replace(/\.csv/g, '').replace(/\.xlsx/g, '');
    cleanedString = cleanedString.replace(/ /g, '_');

    // const receivedData2 = `http://115.68.193.117:8000/net/send-csv?filename=${cleanedString}&type=data`;
    const receivedData2 = `http://115.68.193.117:8000/net/data_down?filename=${cleanedString}&data_type=data`
    const receivedData3 = `http://115.68.193.117:8000/net/data_down?filename=${cleanedString}&data_type=frame`;
    const [selectedValue_top, setselectedValue_top] = useState('10');
    const [poschart, setposchart] =useState();
    const [negchart, setnegchart] =useState();
    const [surveyOptions, setSurveyOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([cleanedString]);
    const [isSurveyOptionSelected, setIsSurveyOptionSelected] = useState(false);
    const [isQuestionOptionSelected, setIsQuestionSelected] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [questionOptions, setQuestionOptions] = useState([]);
    const [selectedSurveyOption, setSelectedSurveyOption] = useState(null);
    const[filename , setfilename] = useState(null);

    

    const handleRadioChange2 = (event) => {
        setselectedValue_top(event.target.value);
      }

    const handleSelectChange = (selected) => {
        // Ensure selectedOptions is an array
        const newSelectedOptions = Array.isArray(selected) ? selected : [selected];
        setSelectedOptions(newSelectedOptions);
        setIsSurveyOptionSelected(newSelectedOptions.length > 0);
      
        // Check if a survey option is selected
        if (newSelectedOptions.length > 0) {
        //   console.log('Selected Option:', newSelectedOptions[0]); 
          // Fetch data from the API based on the selected option(s)
          const selectedOption = newSelectedOptions[0]; // Assuming you're interested in the first selected option
    
          setfilename(selectedOption.value);
        //   console.log("filename : " , filename);
    
          setSelectedSurveyOption(selectedOption.value);
          const questionOptionUrl = `http://115.68.193.117:8000/net/question-list?filename=${selectedOption}`;
      
          axios
            .get(questionOptionUrl)
            .then((response) => {
              const questionOptions = response.data.map((option) => ({
                value: option.Q,
                label: option.Q_text,
              }));
              setQuestionOptions(questionOptions);
            })
            .catch((error) => {
              console.error('Error fetching question options:', error);
            });
        }
    };

    const handleQuestionChange = (selected) => {
        // Ensure selectedOptions is an array
        const newSelectedOptions = Array.isArray(selected) ? selected : [selected];
        setSelectedQuestions(newSelectedOptions);
        setIsQuestionSelected(newSelectedOptions.length > 0);

        console.log("aaaSelectedQuestions",newSelectedOptions);
    }; 
    
    // API: Fetch survey options
    useEffect(() => {
    const surveyOptionsUrl = 'http://115.68.193.117:8000/net/file_list';
    axios
        .get(surveyOptionsUrl)
        .then((response) => {
        const surveyOptions = response.data.map((option) => ({
            value: option.value,
            label: option.label,
        }));
        setSurveyOptions(surveyOptions);
        })
        .catch((error) => {
        console.error('Error fetching survey options:', error);
        });
    }, []);

    const handleChartClick = async () => {

        setChartData(null);

        const chartDataUrl = `http://115.68.193.117:8000/net/simple-graph?filename=${selectedOptions}&Q_code=${selectedQuestions}&graph_type=pie&top_n=${selectedValue_top}`;
        console.log('chartDataUrl', chartDataUrl);

        try {
            const response = await axios.get(chartDataUrl);
            const chartDataJson = response.data.chartdata; 
            setChartData(chartDataJson);
            setpietotal(response.data.total);
    
        } catch (error) {
            console.error('Error fetching chart data:', error);
            setChartData(null);
        }
            handleChartClick2();
    
    };
    

        const handleChartClick2 = async () => {
            const chartDataUrlPos = `http://115.68.193.117:8000/net/simple-graph?filename=${selectedOptions}&Q_code=${selectedQuestions}&graph_type=sample&emotion=긍정&top_n=${selectedValue_top}`;
            const chartDataUrlNeg = `http://115.68.193.117:8000/net/simple-graph?filename=${selectedOptions}&Q_code=${selectedQuestions}&graph_type=sample&emotion=부정&top_n=${selectedValue_top}`;
            try {
                const responsePos = await axios.get(chartDataUrlPos);

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

    const renderChart = () => {
        // 데이터가 유효한 경우에만 차트 렌더링
        if (chartData && chartData.datasets && chartData.datasets.length > 0) {

            return <PieChart data={chartData} height={400} pietotal={pietotal}/>;

        } else {
        }
    };
    const renderChart2 = () => {
        // 데이터가 유효한 경우에만 차트 렌더링
        if (poschart && poschart.datasets && poschart.datasets.length > 0) {

            return <BarChart data={poschart} height={340} title={'긍정'} />;

        } else {
        }
    };
    const renderChart3 = () => {
        // 데이터가 유효한 경우에만 차트 렌더링
        if (negchart && negchart.datasets && negchart.datasets.length > 0) {
            return <BarChart data={negchart} height={340} title={'부정'} />;

        } else {
        }
    };

    const link1  = () => {
        // window.location.href = './data-pivot?data=${receivedData}';
        router.push(`./data-pivot?data=${selectedOptions}`);
    };
    
    const goback=()=> {
        router.push(`./data-check?data=${selectedOptions}`);
    };
      
    const activeStepVal=3;


    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (

    //1번 프레임 
    <div id='outter_frame1'>

        {/* 2번 프레임 */}
        <div id='outter_frame2'>

            {/* 바로가기 , 타이틀 */}
            <div id='title_frame'>
    
                {/*바로가기  */}
                <div id='page_move'>
                    
                    <TemporaryDrawer/>

                    <Button id='goback' variant="outlined" color="primary" onClick={goback}>이전단계로</Button>
                </div>

                {/* 타이틀 내용 */}
                <div id='title'>

                    <div style={{
                        width: '80%', 
                        paddingRight: '20px', 
                    }}>
                        <HorizontalLinearStepper activeStep={activeStepVal}>
                        </HorizontalLinearStepper>
                    </div>

                </div>
            </div>

            <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab  label="시각화" value="1" />
                    <Tab onClick={link1}label="Pivot" value="2" />
                </TabList>
                </Box>
                <TabPanel value="1">
                    {/* 메인: 선택지 , 차트내용 등 */}
                    <div id='main_frame'>
                        {/* <AuthCheck> */}
                        <div id='options'>
                            <div id='option1'>

                                <div id='option1_1'>
                                    <h2 id='sq'>설문 선택  현재 설문 : {selectedOptions}</h2>
                                    <Select_q placeholder_text="설문지를 선택해주세요" options={surveyOptions} onChange={handleSelectChange}/>
                                </div>

                                <div id='option1_2'>
                                    <div id='top_n'>
                                        {/* <RowRadioButtonsGroup value={selectedValue_top} onChange={handleRadioChange2}/> */}
                                        <RowRadioButtonsGroup value={selectedValue_top} onChange={handleRadioChange2}/>
                                    </div>
                                </div>
                            </div>


                            {isSurveyOptionSelected && (
                                <div>
                                    <div id='option2'>
                                        <h2 id='sq'>질문 선택 Selected Option: {selectedQuestions} </h2>
                                        <Select_q placeholder_text="질문을 선택하세요" options={questionOptions} onChange={handleQuestionChange}/>
                                    </div>
                                </div>
                            )}
                            <div>
                                <div className="chart-container">
                                    <div className="chart-icons">
                                        <Button id='gen_chart' variant="contained" size="large" onClick={() => handleChartClick()}>
                                            차트생성
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        {/* 차트 */}
                        <div id='chart_multi'>
                            <div id='chart_multi_pie'>                          
                                <div className="selected-chart multi_style" id='chart_06'> 
                                    {renderChart()}
                                </div>
                                <div id='download_a'>
                                    <a  href={receivedData2} target="_blank" rel="">
                                        엑셀 다운로드
                                    </a>  
                                    <a  href={receivedData3} target="_blank" rel="">
                                        코드 프레임 다운로드
                                    </a>  
                                </div>                               
                            </div>
                            <div id='chart_multi_bar'>  
                                <div id='chart_multi_bar_1' className="selected-chart multi_style multi_style_bar">{renderChart2()}</div>
                                <div id='chart_multi_bar_2' className="selected-chart multi_style multi_style_bar">{renderChart3()}</div>
                            </div>
                        </div>
                        {/* </AuthCheck> */}
                    {/* 메인: 선택지 , 차트내용 등 */}              
                    </div>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
            </TabContext>
            </Box>

        </div>
    </div>
);
}
