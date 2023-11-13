import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from '@mui/material/Button';
import BasicModal from "../../components/modal";
import CircularIndeterminate from "../../components/spinner";
import Side_bar from "../../newcomp/side_bar";
import Top_select from "../../newcomp/select_que";


export default function Home() {
    const router = useRouter();
    const [hasError, setHasError] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    // 셀렉트 이벤트1
    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };
    // 셀렉트 이벤트2
    const handleFileChange2 = (e) => {
      setSelectedFile2(e.target.files[0]);
    };
  
    const handleDrop = async (e) => {
      e.preventDefault();
  
      const file = e.dataTransfer.files[0];
  
      if (file) {
        setSelectedFile(file);
      }
    };
  
    
    const handleDrop2 = async (e) => {
      e.preventDefault();
  
      const file2 = e.dataTransfer.files[0];
  
      if (file2) {
        setSelectedFile2(file2);
      }
    };
  // 업로드 이벤트
    const handleUpload = async (model_number) => {
    if (!selectedFile) {
      return;
    }

    try {
    
      console.log("전달모델: ",model_number);

      // 스피너 on
      setIsLoading(true);
      
      console.log("selectedFile",selectedFile);
      console.log("selectedFile2",selectedFile2);


      // post formdata 생성
      const formData = new FormData();
      formData.append('files', selectedFile);
      console.log("formData1",formData);

      formData.append('files', selectedFile2);
      console.log("formData2",formData);


      //포스트 요청
      // const response = await axios.post(`http://115.68.193.117:8000/net/upload_t?model_type=${model_number}`, formData);
      const response = await axios.post(`http://115.68.193.117:8000/net/upload_db?model_type=1`, formData);
      console.log("response",response);


      // 선택파일 이름저장
      const uploadFileName = selectedFile.name;

      //리스폰스 반응
      if(response.data==="끝"){
          setIsLoading(false);          

          let cleanedString = uploadFileName.replace(/\.csv/g, '').replace(/\.xlsx/g, '');
          cleanedString = cleanedString.replace(/ /g, '_');

          router.push(`./data-check?data=${cleanedString}`);
      }
      // 리스폰스 fail
      else{
        setIsLoading(false);
        setHasError(true);

      }
    } 
    // 에러시에도 200 +error 표기로 캐치되지 않음
    catch (error) {
      console.error('Error uploading file:', error);
      setIsLoading(false);
      setHasError(true);

    }
  };

  const MyCustomButton = (props) => {
    return <Button as="span" focusRipple={true} variant="contained" color="primary">{props.text}</Button>;
  };

  const i=0;
  const page =1;
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
          <Top_select method={handleUpload} page={page}/>
          

          {/* 메인: 선택지 , 차트내용 등 */}
          <div id='main_frame'>
            {/* <AuthCheck> */}

              {isLoading ? (

                // 로딩중일때 표출할거 스피너
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      speed:'0.65s',
                      height: "100vh", // Adjust the height as needed
                    }}
                  >
                    <p>데이터 업로드중...</p>
                    <CircularIndeterminate />
                  </div>
                </div>
                
              ) : (
                // isLoading false 로 바뀐 후
                  <div>
                    <div style={{ display: 'flex' }}>
                      <div
                        style={{
                            width: '80%',
                            paddingRight: '20px',
                        }}>
                      </div>
                    </div>
                    <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} style={{
                            border: '2px dashed #cccccc',
                            borderRadius: '4px',
                            padding: '20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '300px',
                            marginTop: '20px'
                        }}
                    >
                      {/* 1번 선택 , 2번 미선택 */}
                      {selectedFile!=undefined && selectedFile2==undefined ? (
                        <div>
                            {/* 선택파일이름 */}
                            <p>Selected File: {selectedFile.name}</p>
                            

                        </div>
                      ) : (
                        <p></p>
                      )}

                    {/* 1번 2번 둘다 선택완료 */}
                    {selectedFile&&selectedFile2 ? (
                      <div>
                          {/* 선택파일이름 */}
                          <p>Selected File: {selectedFile.name}</p>
                          
                          {/* 1,2,3,4,5 파라미터 매개변수로 추가 */}
                          {/* <Button id='model_btn' onClick={() => handleUpload_test("kri-2-3-brand-model")}>테스트용버튼</Button>

                          <Button id='model_btn' onClick={() => handleUpload("kri-2-2-food-model")}>
                            식품
                          </Button>

                          <Button id='model_btn' onClick={() => handleUpload("kri-2-1-elec-model")}>
                            전자
                          </Button>

                          <Button id='model_btn' onClick={() => handleUpload("kri-2-3-brand-model")}>브랜드이미지/광고효과</Button>
                          <Button id='model_btn' onClick={() => handleUpload("kri-2-4-public-model")}>공공</Button>
                          <Button id='model_btn' onClick={() => handleUpload("kri-2-5-service-model")}>마케팅서비스</Button> */}
                      </div>
                    ) : (
                      <p>설문 응답 파일을 드래그 하거나 파일을 선택해 주세요</p>
                    )}

                    {/* 에러 발생시 모달나오게 */}
                    {hasError ? (
                      <BasicModal>
                      </BasicModal>
                    ):(
                      <div></div>
                    )
                    }

                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="fileInput"
                    />

                    <label htmlFor="fileInput">
                        
                      <MyCustomButton text="파일 찾기" />
                    </label>
                    </div>
                  </div>
              )}  

              {/* 2번선택 */}
              <div>

                <div>
                  <div style={{ display: 'flex' }}>
            

                    <div
                      style={{
                          width: '80%', // Adjust the width as needed
                          paddingRight: '20px', // Add some space to the right
                      }}>

                        
                    </div>
                  </div>

                  <div
                      onDrop={handleDrop2}
                      onDragOver={(e) => e.preventDefault()}
                      style={{
                          border: '2px dashed #cccccc',
                          borderRadius: '4px',
                          padding: '20px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          height: '300px',
                          marginTop: '20px' // Align items in the center vertically
                      }}
                  >

                    {selectedFile2 ? (
                      <div>
                          {/* 선택파일이름 */}
                          <p>Selected File2: {selectedFile2.name}</p>
                          

                      </div>
                    ) : (
                      <p>설문 변수 가이드를  드래그 하거나 파일을 선택해 주세요</p>
                    )}
                          
                    <input
                        type="file"
                        onChange={handleFileChange2}
                        style={{ display: 'none' }}
                        id="fileInput2"
                    />
                    <label htmlFor="fileInput2">
                      <MyCustomButton text="파일 찾기" />
                    </label>
                  </div>
                </div>
              </div>
            {/* </AuthCheck> */}
            {/* 메인: 선택지 , 차트내용 등 */}              
          </div>
      </div>
    </div>
  );
}
