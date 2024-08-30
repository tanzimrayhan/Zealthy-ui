import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box, Alert } from '@mui/material';
import StepBody from '../../components/step/StepBody.component';
import axios from 'axios';

const OnboardingWizard = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [userDetails, setUserDetails] = React.useState({
        email: '',
        password: '',
        aboutMe: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        birthday: '',
    });
    const [adminConfig, setAdminConfig] = React.useState({});
    const [loading, setLoading] = useState(false);
    const steps = ['Basic Information', 'User Details', 'Others'];
    const isEmailAndPasswordSet = userDetails.email !== '' && userDetails.password !== '';
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    useEffect(() => {
        axios.get('https://zealthy-backend.vercel.app/pages').then((response) => {
            const config = {};
            response.data.forEach(page => {
                config[`page${page.pageNo}`] = page.componentList;
            });
            setAdminConfig(config);
        });
    }, []);

    const handleNext = () => {
        if (activeStep === 0 && !isEmailAndPasswordSet) {
            setError('Email and Password are required');
            return;
        } else if (activeStep === 0 && !validateEmail(userDetails.email)) {
            setError('Please enter a valid email');
            return;
        } else if (activeStep === 0 && userDetails.password.length < 8) {
            setError('Password should be atleast 8 characters long');
            return;
        }
        if (activeStep === 1) {
            const page2Fields = adminConfig['page2'];
            const isPage2FieldsSet = page2Fields.every(field => userDetails[field] !== '');
            if (!isPage2FieldsSet) {
                setError('Please fill in all fields in Step 2');
                return;
            }
        }

        if (activeStep === 2) {
            const page3Fields = adminConfig['page3'];
            const isPage3FieldsSet = page3Fields.every(field => userDetails[field] !== '');
            if (!isPage3FieldsSet) {
                setError('Please fill in all fields in Step 3');
                return;
            }
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setError('');
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleReset = () => {
        setActiveStep(0);
        setUserDetails({
            email: '',
            password: '',
            aboutMe: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            birthday: '',
        });
        setSuccess('');
        setError('');
    };

    const handleFinish = () => {
        if (activeStep === 2) {
            const page3Fields = adminConfig['page3'];
            const isPage3FieldsSet = page3Fields.every(field => userDetails[field] !== '');
            if (!isPage3FieldsSet) {
                setError('Please fill in all fields in Step 3');
                return;
            }
        }
        setLoading(true);
        axios.post('https://zealthy-backend.vercel.app/user', userDetails)
            .then(response => {
                if (response.status === 201) {
                    setError('');
                    setLoading(false);
                    setSuccess(response.data?.message);
                    set
                } else {
                    setError(response.data?.message);
                    setLoading(false);
                }
            })
            .catch(error => {
                setLoading(false);
                setError(error.response.data.message);
            });
    }


    return (
        <Box sx={{
            width: '50%', bgcolor: 'background.paper', p: 5,
            m: 1,
            borderRadius: 4,
        }}>
            <Typography variant='h3' display={'flex'} justifyContent={'center'} paddingBottom={4}>User Onboarding</Typography>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {success}
                </Alert>
            )}
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {/* <Typography sx={{ mt: 2, mb: 1, color:'black' }}>Step {activeStep + 1}</Typography> */}
                   
                    {!success && <StepBody loading={loading} activeStep={activeStep + 1} adminConfig={adminConfig} setUserDetails={setUserDetails} userDetails={userDetails} />}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        {!success && <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>}
                        <Box sx={{ flex: '1 1 auto' }} />


                        {success ? <Button onClick={handleReset}>Reset</Button> : <Button onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>}

                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

export default OnboardingWizard;