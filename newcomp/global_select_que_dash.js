import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { pageExtensions } from '@/next.config';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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
        handleSelectChange(value.value);
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
        <div id ='sedi'>
            <div id='sedi2'>

                <div className='onlyflex'>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        sx={{ width: 1340 }}
                        onChange={(event, value) => handleChange2(event, value)}
                        renderInput={(params) => <TextField {...params} label="데이터를 검색하거나 선택하세요." />}
                    />
                    <div id='top_radio'>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </div>
               </div>
               
                <div id='dash_options' className='onlyflex'>
                    {isSurveyOptionSelected && (
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={questionOptions}
                            sx={{ width: 1340 }}
                            onChange={() => handleQuestionChange()}
                            renderInput={(params) => <TextField {...params} label="데이터를 검색하거나 선택하세요." />}
                        />
                    )}  
                    
                    <Button id='chart_make' onClick={method} endIcon={<AutoFixHighIcon />} size="large" focusRipple={true} variant="contained" color="primary">
                        차트 재생성
                    </Button>
                </div>
            </div>

        </div>
        {/* 만드는중 */}
    </div>
);
}
