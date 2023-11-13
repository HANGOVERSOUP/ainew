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

export default function Top_select() {

    const router = useRouter();    

    if (router.query.data===undefined){
        router.query.data = "LG_gram_data"
    }
    const received = router.query.data;
    let cleanedString = received.replace(/\.csv/g, '').replace(/\.xlsx/g, '');
    cleanedString = cleanedString.replace(/ /g, '_');


    const [surveyOptions, setSurveyOptions] = useState([]);
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
    const location = ['db','mo'];

    const data = 'mo';
    function upload_btn(){

    }
    const top100Films = [
        { label: '우엉'},
        { label: '부엉'},
        { label: ''},
        { label: ''},
        { label: ''},
        { label: ''},
        { label: ''},
    ];
  return (
    //1번 프레임 
    <div>
        {/* <div>
            <div>
                <div>
                    <h2>설문 선택  현재 설문 : {selectedOptions}</h2>
                    <Select_q placeholder_text="설문지를 선택해주세요" options={surveyOptions} onChange={handleSelectChange}/>
                </div>
            </div>
            {isSurveyOptionSelected && (
                <div>
                    <div>
                        <h2>질문 선택 Selected Option: {selectedQuestions} </h2>
                        <Select_q placeholder_text="질문을 선택하세요" options={questionOptions} onChange={handleQuestionChange}/>
                    </div>
                </div>
            )}  
        </div> */}

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
                        <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        sx={{ width: 1440 }}
                        renderInput={(params) => <TextField {...params} label="데이터를 검색하거나 선택하세요." />}
                        />
                    </div>
                    
                    : 
                    
                    <div>
                        <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        sx={{ width: 1440 }}
                        renderInput={(params) => <TextField {...params} label="데이터를 검색하거나 선택하세요." />}
                        />
                    </div>
                
                }
            </div>
            <div>
            <Button id='upload_btn' onClick={upload_btn()} endIcon={<FileUploadIcon />} size="large" focusRipple={true} variant="contained" color="primary">
                데이터 업로드
            </Button>
            </div>
        </div>
        {/* 만드는중 */}
    </div>
);
}
