import React, { use, useEffect, useState } from 'react';
// import Table from "../../components/mui_table";
import TemporaryDrawer from "../../components/menu_direct_drawer";
import HorizontalLinearStepper from "../../components/stepper";
// import ContainedButtons from "../../components/button";
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <>
        <div>
            <TemporaryDrawer/>
        </div>

        <div>
            <HorizontalLinearStepper/>
        </div>

        <div style={{border:'1px red solid'}}>
            버튼들
            <Button variant="contained">Default</Button>
            <Button variant="contained" color="primary">
                Primary
            </Button>
            <Button variant="contained" color="secondary">
                Secondary
            </Button>
            <Button variant="contained" disabled>
                Disabled
            </Button>
            <Button variant="contained" color="primary" href="#contained-buttons">
                Link
            </Button>
        </div>

        <div>
            
        </div>
    </>
  )
}
