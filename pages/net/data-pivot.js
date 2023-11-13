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
import PivotTableUI from '../../components/pivot';

export default function Home() {
    const [dataArray, setdataArray] = useState([]);
    const [pivotstatus,setpivotstatus] = useState(false);
    const router = useRouter();
    const [receivedData2, setreceivedData2]=useState();
  
    if (router.query.data===undefined){
      router.query.data = "LG_gram_data"
    }
    const receivedData = router.query.data;
  
    const fetchData = async () => {
      try {


        const receivedData2 = receivedData.replace(/[\(\)\.csv]/g, '').replace(/ /g, '_');
        setreceivedData2(receivedData2);

        const fullrul=`http://115.68.193.117:8000/net/pivot-data?filename=${receivedData2}`;
        console.log("fullrul",fullrul);
  
        const response = await axios.get(fullrul);
        const responseData = response.data;
  
        if (typeof responseData === 'string') {
            // 문자열을 객체로 파싱
            const parsedData = JSON.parse(responseData);
            
            setdataArray(parsedData);
  
        } else {
            console.error('Received data is not a string:', responseData);
        }
   
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };
  
    const setpivot = () =>{
      setpivotstatus(true);
      fetchData();
  
    };
    useEffect(() => {
      console.log("rendering~");
      setpivot();
    },[]);
  
    const link1  = () => {
        const encodedString =encodeURIComponent(receivedData2);
        console.log("encodedString",encodedString);
        // router.push(`./data-dashboard?data=${encodedString}`);
    };  
  
    const goback=()=> {
        const encodedString =encodeURIComponent(receivedData2);
        console.log("encodedString",encodedString);
        router.push(`./data-check?data=${encodedString}`);
    };

    const [value, setValue] = React.useState('2');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const activeStepVal=3;
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
                    <Tab onClick={link1} label="시각화" value="1" />
                    <Tab label="Pivot" value="2" />
                </TabList>
                </Box>
                <TabPanel value="1">
                    
                </TabPanel>
                <TabPanel value="2">
                    {/* 메인: 선택지 , 차트내용 등 */}
                    <div id='main_frame'>
                        {/* <AuthCheck> */}
                            <p>전달파일: {receivedData}</p>

                            {/* 차트 */}
                            <div id='chart'>

                                {pivotstatus && (
                                    <PivotTableUI dataArray={dataArray}/>
                                )} 

                            </div>
                        {/* </AuthCheck> */}
                    {/* 메인: 선택지 , 차트내용 등 */}              
                    </div>                    
                </TabPanel>
            </TabContext>
            </Box>

        </div>
    </div>
);
}
