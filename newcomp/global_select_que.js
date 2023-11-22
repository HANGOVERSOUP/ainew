import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Select_q from "../components/select";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { pageExtensions } from '@/next.config';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function Top_select({method,method2,page,routed}) {

    const router = useRouter();    

    if (router.query.data===undefined){
        router.query.data = "LG_gram_data"
    }
    const received = router.query.data;
    let cleanedString = received.replace(/\.csv/g, '').replace(/\.xlsx/g, '');
    cleanedString = cleanedString.replace(/ /g, '_');


    const [surveyOptions, setSurveyOptions] = useState([]);
    const [selectfile ,setselectfile] = useState();
    const [selectedOptions, setSelectedOptions] = useState([cleanedString]);
    const [isSurveyOptionSelected, setIsSurveyOptionSelected] = useState(false);

    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [questionOptions, setQuestionOptions] = useState([]);


        
    const handleSelectChange = (selected) => {
        const newSelectedOptions = Array.isArray(selected) ? selected : [selected];
        setSelectedOptions(newSelectedOptions);
        setIsSurveyOptionSelected(newSelectedOptions.length > 0);
      

        if (newSelectedOptions.length > 0) {

          const selectedOption = newSelectedOptions[0];
    

          const questionOptionUrl = `http://115.68.193.117:8000/net/question-list?filename=${selectedOption}`;
      
          axios
            .get(questionOptionUrl)
            .then((response) => {
              const questionOptions = response.data.map((option) => ({
                value: option.Q,
                label: option.Q_text,
              }));
              setQuestionOptions(questionOptions);
              console.log("questionOptions",questionOptions);
            })
            .catch((error) => {
              console.error('Error fetching question options:', error);
            });
        }
    };


    const handleQuestionChange = (selected) => {
        const newSelectedOptions = Array.isArray(selected) ? selected : [selected];
        setSelectedQuestions(newSelectedOptions);
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

    const [datalocation, setdatalocation] = React.useState('mo');
    const handleChange = (event) => {
        setdatalocation(event.target.value);
    };
    const handleChange2 = (event, value) => {
        setselectfile(value);
        console.log("선택된 파일:", value);

        method2(value);
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
                        renderInput={(params) => <TextField {...params} label={routed} />}
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
                            renderInput={(params) => <TextField {...params} label={routed} />}
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
            <div>

                {/* 조건에 맞춰 버튼을 변경합시다 업로드, 모델실행 등 */}

                {page === 1 ? (
                    <Button id='upload_btn' onClick={method} endIcon={<FileUploadIcon />} size="large" focusRipple={true} variant="contained" color="primary">
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

                        <Button id='model_run_btn' onClick={() => method(selectfile)} endIcon={<RestartAltIcon />} size="large" focusRipple={true} variant="contained" color="primary">
                            모델 실행
                        </Button>
                    </div>
                ) : page === 3 ? (
                    <div id='visual_btn_div'>
                        <Button id='' onClick={() => method()} endIcon={<RestartAltIcon />} size="large" focusRipple={true} variant="contained" color="primary">
                            시각화
                        </Button>
                        <Button id='visual_btn' onClick={() => method()} endIcon={<RestartAltIcon />} size="large" focusRipple={true} variant="contained" color="primary">
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
        {/* 만드는중 */}
    </div>
);
}
