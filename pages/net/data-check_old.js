import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

import TopLabel from "../../components/top_label";
import DynamicTable from "../../components/mui_table";


export default function Home() {

    const [csvstatus, setCsvStatus] = useState(false);
    const router = useRouter();

    if (router.query.data===undefined){
        router.query.data = "LG_gram_data"
    }
    const receivedData = router.query.data;

    // 테스트시
    const [receivedData2 , setreceivedData2] =useState(receivedData.replace(/[\(\)\.csv]/g, '').replace(/\.xlsx/g, '').replace(/ /g, '_'));
    // const receivedData2 = "korean";

    const [uploadrows,setUploadRows] = useState();

    const showCsv = () => {
        setCsvStatus(true);
        // fetchData(); // 버튼 클릭 시 데이터를 가져오도록 호출
    };

    const gotonext = async () => {
        router.push(`./data-dashboard?data=${receivedData2}`);
        // window.location.href = `./data-dashboard?data=${receivedData}`;
    };

    const goback=()=> {
        router.push(`./data-upload?data=${receivedData2}`);
    };


  const activeStepVal = 1;
  return (

    //1번 프레임 
    <div id='outter_frame1'>

        {/* 2번 프레임 */}
        <div id='outter_frame2'>
            

            <TopLabel goback={goback} activeStep={activeStepVal}/>

            {/* 메인: 선택지 , 차트내용 등 */}
            <div id='main_frame'>
            {/* <AuthCheck> */}
                <div>

                    <div id='rec'>
                        <p>현재 설문 : {receivedData2}</p>
                    </div>
                    <div id='csvbtn'>
                        <Button variant="contained" color="primary" id='csvtb' onClick={showCsv}>
                            Show CSV Data
                        </Button>
        
                        <Button variant="contained" color="primary" id='next' onClick={gotonext}>
                            시각화 페이지 이동
                        </Button>
                    </div>
        
                    <div id='csvview'>
                        {csvstatus && (
                            <DynamicTable data={receivedData2}/>
                        )}
                    </div>
                </div>   
            {/* </AuthCheck>      */}
            {/* 메인: 선택지 , 차트내용 등 */}              
            </div>
        </div>
    </div>
);
}
