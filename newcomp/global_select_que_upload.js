import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function Top_select({method,method2,method3,page,routed}) {

    const router = useRouter();    

    if (router.query.data===undefined){
        router.query.data = ""
    }
    const received = router.query.data;
    let cleanedString = received.replace(/\.csv/g, '').replace(/\.xlsx/g, '');
    cleanedString = cleanedString.replace(/ /g, '_');


    const [surveyOptions, setSurveyOptions] = useState([]);
    const [selectfile ,setselectfile] = useState();
    const [selectedOptions, setSelectedOptions] = useState([cleanedString]);
    const [isSurveyOptionSelected, setIsSurveyOptionSelected] = useState(false);
    const [isSurveyqueSelected, setisSurveyqueSelected] = useState(false);


    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [questionOptions, setQuestionOptions] = useState([]);


    // 선택된 파일로 질문 리스트 가져오기
    const handleSelectChange = async (selected) => {
        const newSelectedOptions = Array.isArray(selected) ? selected : [selected];
        setSelectedOptions(newSelectedOptions);
        setIsSurveyOptionSelected(newSelectedOptions.length > 0);
        // console.log("global_select_que_newArray",newSelectedOptions);

        if (newSelectedOptions.length > 0) {
          const selectedOption = newSelectedOptions[0];         
          const questionOptionUrl = `http://115.68.193.117:9999/net/question-list?p_name=${selectedOption}`;
          const response = await axios.get(questionOptionUrl);
          const sur = response.data
          const newArray = sur.map(item => item.question_text);
          
          setQuestionOptions(newArray);
        }
    };

    // API: Fetch survey options
    useEffect(() => {
        // console.log("useEffect_global_select_que_surveyOptions",surveyOptions);
        // console.log("useEffect_global_select_que_selectedQuestions",selectedQuestions);
        method2(surveyOptions,selectedQuestions);
    }, [selectedQuestions]);

    // 질문이 선택되었을떄 이벤트 --> 테이블로 전달
    const handleQuestionChange = (selected) => {
        const newSelectedOptions = Array.isArray(selected) ? selected : [selected];
        setSelectedQuestions(newSelectedOptions);
        setisSurveyqueSelected(newSelectedOptions.length > 0);
    }; 
    
    // 파일 리스트 가져오기
    const dataselection = async () => {
        const surveyOptionsUrl = 'http://115.68.193.117:9999/net/file-list';
        const response = await axios.get(surveyOptionsUrl);
        const sur = response.data
        const newArray = sur.map(item => item.project_name);
        // console.log("newArray",newArray);
        setSurveyOptions(newArray);
    }; 

    // API: Fetch survey options
    useEffect(() => {
        dataselection();
    }, []);

    const [datalocation, setdatalocation] = React.useState('mo');
    const handleChange = (event) => {
        setdatalocation(event.target.value);
    };
    const handleChange2 = (event, value) => {
        setselectfile(value);
        // console.log("global_select_que_선택된 파일:", value);

        handleSelectChange(value)
    };
    const handleChange3 = (event, value) => {
        // setselectfile(value);
        // console.log("global_select_que_선택된 질문:", value);

        handleQuestionChange(value)
    };
      

    const location = ['db','mo'];

    const data = 'mo';

    const top100Films =  surveyOptions;


  return (
    //1번 프레임 
    <div>


        {/* 만드는중 */}        
        <div id ='sedi'>
            <div>
                <FormControl fullWidth sx={{ m: 1, width: 140 }}>
                    <InputLabel id="demo-simple-select-label">데이터 위치</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={datalocation}
                    label="Age"
                    onChange={handleChange}
                    >
                        <MenuItem value={location[0]}>DB</MenuItem>
                        <MenuItem value={location[1]}>재확인</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div id='sedi2'>
                {datalocation === 'db' ? 
                    <div>
                    {routed != undefined ? 
                    // routed
                    <Autocomplete
                        key="unique-key-for-autocomplete"
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        sx={{ width: 1340 }}
                        onChange={(event, value) => handleChange2(event, value)}
                        renderInput={(params) => <TextField {...params} label="데이터를 검색하거나 선택하세요." />}
                    />
                    :
                    // not routed
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        sx={{ width: 1340 }}
                        onChange={(event, value) => handleChange2(event, value)}
                        renderInput={(params) => <TextField {...params} label="데이터를 검색하거나 선택하세요." />}
                    />
                    }
                    </div>
                    : 
                    <div>
                        {routed != undefined ? 
                        // routed
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            sx={{ width: 1340 }}
                            onChange={(event, value) => handleChange2(event, value)}
                            renderInput={(params) => <TextField {...params} label="데이터를 검색하거나 선택하세요." />}
                        />
                        :
                        // not routed
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            sx={{ width: 1340 }}
                            onChange={(event, value) => handleChange2(event, value)}
                            renderInput={(params) => <TextField {...params} label="데이터를 검색하거나 선택하세요." />}
                        />
                        }
                    </div>
                }

            </div>

            <div id='container'>

                {/* 조건에 맞춰 버튼을 변경합시다 업로드, 모델실행 등 */}

                {page === 1 ? (
                    <Button id='upload_btn' onClick={() => method(selectfile)} endIcon={<FileUploadIcon />} focusRipple={true} size="large"  variant="contained" color="primary">
                        데이터 업로드
                     
                    </Button>
                ) : page === 2 ? (
                    <div id='modeldiv'>
                        <FormControl fullWidth sx={{ m: 1, width: 140 }}>
                            <InputLabel id="demo-simple-select-label">모델 선택</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // onChange={handleChange}
                            >
                                <MenuItem value='1'>식품</MenuItem>
                                <MenuItem value='2'>전자</MenuItem>
                                <MenuItem value='3'>브랜드이미지/광고효과</MenuItem>
                                <MenuItem value='4'>공공</MenuItem>
                                <MenuItem value='5'>마케팅서비스</MenuItem>
                            </Select>
                        </FormControl>

                        <Button id='model_run_btn' onClick={() => method(selectfile)} endIcon={<RestartAltIcon />} focusRipple={true} size="large"  variant="contained" color="primary">
                            모델 실행
                        </Button>
                    </div>
                ) : page === 3 ? (
                    <div id='visual_btn_div'>
                        <Button id='' onClick={() => method()} endIcon={<RestartAltIcon />} size="large" focusRipple={true} variant="contained" color="primary">
                            시각화
                        </Button>
                        <Button id='visual_btn' onClick={() => method3()} endIcon={<RestartAltIcon />} size="large" focusRipple={true} variant="contained" color="primary">
                            NET수정
                        </Button>
                    </div>
                ) : page === 4 ? (
                    <Button id='' onClick={() => method()} endIcon={<RestartAltIcon />} size="large" focusRipple={true} variant="contained" color="primary">
                        모델 실행
                    </Button>
                ) : null}
            </div>
        </div>
    </div>
);
}
