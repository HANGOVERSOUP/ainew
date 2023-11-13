import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from '@mui/material/Button';
import BasicModal from "../../components/modal";
import CircularIndeterminate from "../../components/spinner";
import Side_bar from "../../newcomp/side_bar";
import Top_select from "../../newcomp/select_que";
import FullFeaturedCrudGrid from "../../components/test_mui_edit";

export default function Home() {
  const [csvstatus, setCsvStatus] = useState(true);
  const [dataArray, setdataArray] = useState([]);
  const [columnNames, setColumnNames] = useState([]); // 동적 컬럼 이름
  const router = useRouter();

  if (router.query.data===undefined){
      router.query.data = "LG_gram_data"
  }
  const [receivedData,setreceivedData]=useState(router.query.data);
  const [receivefilename, setreceivefilename] = useState(null);

  // 테스트시
  const [receivedData2 , setreceivedData2] =useState(receivedData);

  const gotonext = async () => {
      router.push(`./data-dashboard?data=${receivedData2}`);
      // window.location.href = `./data-dashboard?data=${receivedData}`;
  };

  const goback=()=> {
      router.push(`./data-upload?data=${receivedData2}`);
  };

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

  const i=1;
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
          <Top_select method2={filechanged} method={runmodel} page={page} routed={receivedData}/>
          

          {/* 메인: 선택지 , 차트내용 등 */}
          <div id='main_frame'>
            {/* <AuthCheck> */}
            <div>
              <div id='rec'>
                  {/* <p>현재 설문 : {receivedData2}</p> */}
              </div>


              <div id='csvview'>
                  {/* {csvstatus && (
                      <DynamicTable data={receivedData2}/>
                  )} */}
                  {csvstatus && (
                      <FullFeaturedCrudGrid file={receivedData}/>
                  )}
              </div>
            </div>
            {/* </AuthCheck> */}
            {/* 메인: 선택지 , 차트내용 등 */}              
          </div>
      </div>
    </div>
  );
}
