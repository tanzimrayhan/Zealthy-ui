import React from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box, Alert } from '@mui/material';
import StepBody from '../step/StepBody.component';
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

    const steps = ['Basic Information', 'User Details', 'Others'];
    const isEmailAndPasswordSet = userDetails.email !== '' && userDetails.password !== '';

    const handleNext = () => {
        if (activeStep === 0 && !isEmailAndPasswordSet) {
            setError('Email and Password are required');
            return;
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
        axios.post('https://zealthy-backend.vercel.app/user', userDetails)
            .then(response => {
                if (response.status === 201) {
                    setSuccess(response.data?.message);
                } else {
                    setError(response.data?.message);
                }
            })
            .catch(error => {
                setError(error.response.data.message);
            });
    }


    return (
        <Box sx={{
            width: '50%', bgcolor: 'background.paper', p: 5,
            m: 1,
            borderRadius: 4,
        }}>
            <Typography variant='h3'display={'flex'} justifyContent={'center'} paddingBottom={4}>User Onboarding</Typography>
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
                    {!success && <StepBody activeStep={activeStep + 1} setUserDetails={setUserDetails} userDetails={userDetails} />}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
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