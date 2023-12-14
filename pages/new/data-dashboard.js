import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Side_bar from "../../newcomp/global_side_bar";
import Top_select from "../../newcomp/global_select_que_dash";
import PieAnimation from "../../newcomp/chart_pie";
import CombinedChart from "../../newcomp/chart_bar_line";
import axios from 'axios';
import { BedRounded } from '@mui/icons-material';
import AuthCheck from "../../newcomp/login_auth-check";
export default function Home() {
  const router = useRouter();

  // if (router.query.data===undefined){
  //     router.query.data = "test1"
  // }
  const [receivedData,setreceivedData]=useState(router.query.p_name);
  const [receivedDataque,setreceivedDataque]=useState(router.query.question);
  const [good,setgood]=useState("bad");
  // console.log("dash_router.query",router.query);
  // console.log("dash_router.query.data",receivedData);
  // console.log("dash_router.query.question",receivedDataque);
  // 파일명변동이벤트
  const filechanged = async (selectfile,selectque) => {
    if(selectfile!=null){
      // console.log("dash_변동1",selectfile);
      // console.log("dash_변동2",selectque);
      setreceivedData(selectfile);
      setreceivedDataque(selectque);
      setgood("good");
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
          <Top_select method2={filechanged} page={page} routed_p={receivedData} routed_q={receivedDataque}/>
          

          {/* 메인: 선택지 , 차트내용 등 */}
          <div id='main_frame'>
            <AuthCheck>
            <div className='onlyflex' id='chart_contain'>
            {good ==="good" &&(
            <>
            
              <div id='chart_pie' className=''>
                <PieAnimation file={receivedData} fileque={receivedDataque}/>                  
              </div>

              <div id='chart_bars'>
                <CombinedChart file={receivedData} fileque={receivedDataque}/>
              </div>
              </>
            )}
            </div>
            </AuthCheck>
            {/* 메인: 선택지 , 차트내용 등 */}              
          </div>
      </div>
    </div>
  );
}
