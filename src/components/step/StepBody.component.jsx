import React from 'react'
import Step1 from './Step1.component'
import DynamicSteps from './DynamicSteps';
import { Box, CircularProgress } from '@mui/material';

const StepBody = ({loading, activeStep, setUserDetails, userDetails, adminConfig }) => {
  
  const renderBody = (step) => {
    switch (step) {
      case 1:
        return (
         <Step1 setUserDetails={setUserDetails} userDetails={userDetails} />
        )
      default:
        return (
        loading ? <Box display={'flex'} padding={3}><CircularProgress /></Box> :
        <DynamicSteps step={step} adminConfig={adminConfig} setUserDetails={setUserDetails} userDetails={userDetails}/>
        )
    }
  }

  return (
    <>{renderBody(activeStep)}</>
  )
}

export default StepBody