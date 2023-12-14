import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Top_select({method,method2,page,routed_p,routed_q}) {
    // console.log("global_select_que_dash_routed_p",routed_p);
    // console.log("global_select_que_dash_routed_q",routed_q);
    const router = useRouter();    

    // if (router.query.data===undefined){
    //     router.query.data = "LG_gram_data"
    // }
    // const received = router.query.data;
    // let cleanedString = received.replace(/\.csv/g, '').replace(/\.xlsx/g, '');
    // cleanedString = cleanedString.replace(/ /g, '_');


    const [surveyOptions, setSurveyOptions] = useState([]);
    const [selectfile ,setselectfile] = useState(routed_p);
    const [selectedOptions, setSelectedOptions] = useState(routed_q);
    const [isSurveyOptionSelected, setIsSurveyOptionSelected] = useState(false);
    const [isSurveyqueSelected, setisSurveyqueSelected] = useState(false);

    const [selectedQuestions, setSelectedQuestions] = useState(routed_q);
    const [questionOptions, setQuestionOptions] = useState([]);


        
    const handleSelectChange = async (selected) => {
        const newSelectedOptions = Array.isArray(selected) ? selected : [selected];
        setSelectedOptions(newSelectedOptions);
        setIsSurveyOptionSelected(newSelectedOptions.length > 0);

        if (newSelectedOptions.length > 0) {
          const selectedOption = newSelectedOptions[0];         
          const questionOptionUrl = `http://115.68.193.117:9999/net/question-list?p_name=${selectedOption}`;
          const response = await axios.get(questionOptionUrl);
          const sur = response.data
          const newArray = sur.map(item => item.question_text);
          setQuestionOptions(newArray);
        }
    };


    useEffect(() => {
        // console.log("useEffect_global_select_que_surveyOptions",surveyOptions);
        // console.log("useEffect_global_select_que_selectedQuestions",selectedQuestions);
        method2(surveyOptions,selectedQuestions);
    }, [selectfile,selectedQuestions]);

    const handleQuestionChange = (selected) => {
        const newSelectedOptions = Array.isArray(selected) ? selected : [selected];
        setSelectedQuestions(newSelectedOptions);
        setisSurveyqueSelected(newSelectedOptions.length > 0);
    }; 
    
    // 데이터 선택
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
        // console.log("dash_surveyOptions",surveyOptions);
        // console.log("dash_selectedQuestions",selectedQuestions);
        // method2(surveyOptions,selectedQuestions);
        dataselection();
        // method2(surveyOptions,selectedQuestions);
    }, []);

    const [datalocation, setdatalocation] = React.useState('mo');
    const handleChange = (event) => {
        setdatalocation(event.target.value);
    };
    const handleChange2 = (event, value) => {
        handleSelectChange(value);
        setselectfile(value);
        // console.log("선택된 파일:", value);

        // method2(value);
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
                        // value={selectfile}
                    />
                    {/* <div id='top_radio'>
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
                    </div> */}
               </div>
               
                <div id='dash_options' className='onlyflex'>
                    {/* {isSurveyOptionSelected && ( */}
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={questionOptions}
                            sx={{ width: 1340 }}
                            onChange={(event, value) => handleChange3(event, value)}
                            renderInput={(params) => <TextField {...params} label="데이터를 검색하거나 선택하세요." />}
                            // value={selectedQuestions}
                        />
                    {/* )}   */}
                    
                    {/* <Button id='chart_make' onClick={method} endIcon={<AutoFixHighIcon />} focusRipple={true} size="large" variant="contained" color="primary">
                
                        차트 재생성
                    </Button> */}
                </div>
            </div>

        </div>
        {/* 만드는중 */}
    </div>
);
}
