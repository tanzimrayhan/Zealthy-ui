import React, { useEffect, useState } from 'react'
import Step1 from './Step1.component'
import DynamicSteps from './DynamicSteps';
import axios from 'axios';

const StepBody = ({ activeStep, setUserDetails, userDetails, adminConfig }) => {

  // const [adminConfig, setAdminConfig] = useState({});
  // const adminConfig = {
  //   page2: ['aboutMe', 'birthday'],
  //   page3: ['street', 'city', 'state', 'zip'],
  // };
  
  const renderBody = (step) => {
    switch (step) {
      case 1:
        return (
         <Step1 setUserDetails={setUserDetails} userDetails={userDetails} />
        )
      default:
        return <DynamicSteps step={step} adminConfig={adminConfig} setUserDetails={setUserDetails} userDetails={userDetails}/>
    }
  }

  return (
    <>{renderBody(activeStep)}</>
  )
}

export default StepBody