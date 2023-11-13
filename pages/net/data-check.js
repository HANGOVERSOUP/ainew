import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import TemporaryDrawer from "../../components/menu_direct_drawer";
import HorizontalLinearStepper from "../../components/stepper";
import FullFeaturedCrudGrid from "../../components/test_mui_edit";
import BasicSelect from "../../components/table_select";
export default function Home() {

    const [csvstatus, setCsvStatus] = useState(false);
    const [dataArray, setdataArray] = useState([]);
    const [columnNames, setColumnNames] = useState([]); // 동적 컬럼 이름
    const router = useRouter();

    if (router.query.data===undefined){
        router.query.data = "LG_gram_data"
    }
    const receivedData = router.query.data;
    const [receivefilename, setreceivefilename] = useState(null);

    // 테스트시
    const [receivedData2 , setreceivedData2] =useState(receivedData);
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
    const handledatanum = (selected) => {
        const number=selected
        // 넘버를 던져줍시다 테이블매개변수로
        console.log("selecteddatanum",number);
    }; 

  const activeStepVal = 1;
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

            {/* 메인: 선택지 , 차트내용 등 */}
            <div id='main_frame'>
            {/* <AuthCheck> */}
                <div>

                    <div id='rec'>
                        {/* <p>현재 설문 : {receivedData2}</p> */}
                    </div>
                    <div id='csvbtn'>
                        <div id='select_num'>
                            {/* api 호출할떄 개수지정 셀렉트 */}
                            <BasicSelect onChange={handledatanum}/>
                            <Button variant="contained" color="primary" id='csvtb' onClick={showCsv}>
                                Show CSV Data
                            </Button>
                        </div>

                        <div id='move_to_dash'>
                            <Button variant="contained" color="primary" id='next' onClick={gotonext}>
                                시각화 페이지 이동
                            </Button>
                        </div>

                    </div>
        
                    <div id='csvview'>
                        {/* {csvstatus && (
                            <DynamicTable data={receivedData2}/>
                        )} */}
                        {csvstatus && (
                            <FullFeaturedCrudGrid/>
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
