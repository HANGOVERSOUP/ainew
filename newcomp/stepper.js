import React from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';

function StepLayout({ activeStep }) {
  const steps = [
    { title: 'Step 1', description: '데이터 업로드' },
    { title: 'Step 2', description: '데이터 확인' },
    { title: 'Step 3', description: '모델 데이터 확인' },
  ];

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>
              {step.title}
              <div>{step.description}</div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* <Button variant="contained" color="primary">
        Next
      </Button> */}
    </div>
  );
}

export default StepLayout;
