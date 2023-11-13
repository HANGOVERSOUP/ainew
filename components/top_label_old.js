import * as React from 'react';
import TemporaryDrawer from './menu_direct_drawer';
import HorizontalLinearStepper from './stepper';
import Button from '@mui/material/Button';

export default function TopLabel({ goback , activeStep}) {
  return (
    <div>
      {/* 바로가기 , 타이틀 */}
      <div id='title_frame'>
        {/* 바로가기  */}
        <div id='page_move'>
          <TemporaryDrawer />
          <Button id='goback' variant="outlined" color="primary" onClick={goback}>
            이전단계로
          </Button>
        </div>
        {/* 타이틀 내용 */}
        <div id='title'>
          <div style={{ width: '80%', paddingRight: '20px' }}>
            <HorizontalLinearStepper activeStep={activeStep} />
          </div>
        </div>
      </div>
    </div>
  );
}
