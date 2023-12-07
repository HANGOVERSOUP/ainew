import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Side_bar from "../../newcomp/global_side_bar";
import Top_select from "../../newcomp/global_select_que";
import FullFeaturedCrudGrid from "../../newcomp/editmode_edit";

export default function Home() {
  const [csvstatus, setCsvStatus] = useState(true);
  const router = useRouter();

  if (router.query.data===undefined){
      router.query.data = ""
  }
  const [receivedData,setreceivedData]=useState(router.query.p_name);
  const [receivedDataque,setreceivedDataque]=useState(router.query.question);

  // 시각화버튼
  const runmodel = async () => {

    console.log("selectfilaaae",receivedData);
    console.log("selectq",receivedDataque);

    const params = {
      question: receivedDataque,   
    };
    const queryString = new URLSearchParams(params).toString();
    console.log("queryString",queryString);
    router.push(`./data-dashboard?p_name=${receivedData}&question=${queryString}`);
  };
  // net수정버튼
  const runmodel2 = async () => {

    console.log("selectfilaaae",receivedData);
    console.log("selectq",receivedDataque);

    const queryString = encodeURIComponent(receivedDataque);
    // const queryString = new URLSearchParams(params).toString();
    console.log("queryString",queryString);
    router.push(`./data-net?p_name=${receivedData}&question=${queryString}`);
  };

  // 파일명변동이벤트
  const filechanged = async (selectfile,selectque) => {
    if(selectfile!=null){
      console.log("변동1",selectfile);
      console.log("변동2",selectque);      
      setreceivedData(selectfile);
      setreceivedDataque(selectque);
    }
  };

  const i=2;
  const page=3;
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
          <Top_select method2={filechanged} method={runmodel} method3={runmodel2} page={page} routed={receivedData}/>
          

          {/* 메인: 선택지 , 차트내용 등 */}
          <div id='main_frame' className='visualize_div'>
            {/* <AuthCheck> */}
            <div>
              <div id='rec'>
                  {/* <p>현재 설문 : {receivedData2}</p> */}
              </div>


              <div id='csvview2' > 
                  {/* {csvstatus && (
                      <DynamicTable data={receivedData2}/>
                  )} */}
                  {csvstatus && (
                      <FullFeaturedCrudGrid file={receivedData} fileque={receivedDataque}/>
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
