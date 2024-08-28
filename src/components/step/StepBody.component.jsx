import React, { useEffect, useState } from 'react'
import Step1 from './Step1.component'
import DynamicSteps from './DynamicSteps';
import axios from 'axios';

const StepBody = ({ activeStep, setUserDetails, userDetails }) => {

  const [adminConfig, setAdminConfig] = useState({});
  // const adminConfig = {
  //   page2: ['aboutMe', 'birthday'],
  //   page3: ['street', 'city', 'state', 'zip'],
  // };

  useEffect(() => {
    axios.get('https://zealthy-backend.vercel.app/pages').then((response) => {
      const config = {};
      response.data.forEach(page => {
        config[`page${page.pageNo}`] = page.componentList;
      });
      setAdminConfig(config);
    });
  },[]);

  
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
    <div>{renderBody(activeStep)}</div>
  )
}

export default StepBody