import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Side_bar from "../../newcomp/global_side_bar";
import Top_select from "../../newcomp/global_select_que";
import FullFeaturedCrudGrid from "../../newcomp/editraw_edit";
// import FullFeaturedCrudGrid from "../../components/test_mui_edit";
import AuthCheck from "../../newcomp/login_auth-check";
export default function Home() {
  const [csvstatus, setCsvStatus] = useState(true);
  const router = useRouter();

  if (router.query.data===undefined){
      router.query.data = ""
  }
  const [receivedData,setreceivedData]=useState(router.query.data);
  const [receivedDataque,setreceivedDataque]=useState();

  // 모델실행버튼클릭이벤트
  const runmodel = async (selectfile) => {
    // console.log("selectfilaaae",selectfile);
    try{
      // const myurl = `http://115.68.193.117:9999/net/run-model?p_name=koreanaaaaaaa&model=kri-2-3-brand-model`;
      const response = await axios.get(myurl);
  
      // console.log("modelrun",response);
    }catch(error){
      console.error('Error model:', error);
    }
  };

  // 파일명변동이벤트
  const filechanged = async (selectfile,selectque) => {
    if(selectfile!=null){
      // console.log("변동1",selectfile);
      // console.log("변동2",selectque);      
      setreceivedData(selectfile);
      setreceivedDataque(selectque);
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
            <AuthCheck>
            <div>
              <div id='rec'>
                  {/* <p>현재 설문 : {receivedData2}</p> */}
              </div>


              <div id='csvview'>
                  {/* {csvstatus && (
                      <DynamicTable data={receivedData2}/>
                  )} */}
                  {csvstatus && (
                      <FullFeaturedCrudGrid file={receivedData} fileque={receivedDataque}/>
                  )}
              </div>
            </div>
            </AuthCheck>
            {/* 메인: 선택지 , 차트내용 등 */}              
          </div>
      </div>
    </div>
  );
}
