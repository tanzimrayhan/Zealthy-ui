import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography, Button, Alert } from '@mui/material';
import axios from 'axios';

function Admin() {
    const [page2Layout, setPage2Layout] = useState([]);
    const [page3Layout, setPage3Layout] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleResetPages = () => {
        axios.get('https://zealthy-backend.vercel.app/resetPages').then(response => {
            console.log(response);
            if (response.status === 200) {
                setSuccess(response.data?.message);
            } else {
                setError(response.data?.message);
            }
        }).catch(error => {
            setError(error.message);
        });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (value === 'Page2') {
            setPage3Layout(prev => {
                if (prev.includes(name)) {
                    return prev.filter(item => item !== name);
                }
                return prev;
            });

            setPage2Layout(prev => {
                if (prev.includes(name)) {
                    return prev
                }
                return [...prev, name];
            });
            setError('');
            setSuccess('');
        }
        if (value === 'Page3') {
            setPage2Layout(prev => {
                if (prev.includes(name)) {
                    return prev.filter(item => item !== name);
                }
                return prev;
            });
            setPage3Layout(prev => {
                if (prev.includes(name)) {
                    return prev
                }
                return [...prev, name];
            });
            setError('');
            setSuccess('');
        }
        // Add other conditions for different form controls if necessary
    };

    const handleSaveLayout = () => {
        console.log(page2Layout);
        console.log(page3Layout);
        if (page2Layout.length === 0 || page3Layout.length === 0) {
            setError('Please select at least one field for each page');
            return;
        }

        axios.post('https://zealthy-backend.vercel.app/pages', { pageNo: 2, componentList: page2Layout }).then(response => {
            console.log(response);
            if (response.status === 201) {
                setSuccess(response.data?.message);
            } else {
                setError(response.data?.message + " for Page 2");
            }
        }).catch(error => {
            setError(error.message);
        });

        axios.post('https://zealthy-backend.vercel.app/pages', { pageNo: 3, componentList: page3Layout }).then(response => {
            console.log(response);
            if (response.status === 201) {
                setSuccess(response.data?.message);
            } else {
                setError(response.data?.message + " for Page 3");
            }
        }).catch(error => {
            setError(error.message);
        });
    }


    return (
        <Box sx={{
            width: '50%',
            bgcolor: 'background.paper',
            p: 5,
            m: 1,
            borderRadius: 5,
        }}>
            <Typography variant='h3' sx={{ display: 'flex', justifyContent: 'center' }}>Admin Config</Typography>

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
            <Box sx={{
                paddingTop: 2,
                display: 'flex',
                flexDirection: 'column'
            }}>

                <FormControl>
                    <Typography variant="subtitle1">About Me</Typography>
                    <Select onChange={handleChange} name="aboutMe" >
                        <MenuItem value="Page2">Page 2</MenuItem>
                        <MenuItem value="Page3">Page 3</MenuItem>
                        {/* Add other MenuItems as necessary */}
                    </Select>
                </FormControl>
                <FormControl>
                    <Typography variant="subtitle1">City</Typography>
                    <Select onChange={handleChange} name="city">
                        <MenuItem value="Page2">Page 2</MenuItem>
                        <MenuItem value="Page3">Page 3</MenuItem>
                        {/* Add other MenuItems as necessary */}
                    </Select>
                </FormControl>
                <FormControl>
                    <Typography variant="subtitle1">State</Typography>
                    <Select onChange={handleChange} name="state">
                        <MenuItem value="Page2">Page 2</MenuItem>
                        <MenuItem value="Page3">Page 3</MenuItem>
                        {/* Add other MenuItems as necessary */}
                    </Select>
                </FormControl>
                <FormControl>
                    <Typography variant="subtitle1">Zip</Typography>
                    <Select onChange={handleChange} name="zip">
                        <MenuItem value="Page2">Page 2</MenuItem>
                        <MenuItem value="Page3">Page 3</MenuItem>
                        {/* Add other MenuItems as necessary */}
                    </Select>
                </FormControl>
                <FormControl>
                    <Typography variant="subtitle1">Birthday</Typography>
                    <Select onChange={handleChange} name="birthday">
                        <MenuItem value="Page2">Page 2</MenuItem>
                        <MenuItem value="Page3">Page 3</MenuItem>
                        {/* Add other MenuItems as necessary */}
                    </Select>
                </FormControl>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'} paddingY={2}>
                <Button onClick={handleResetPages} variant='outlined'>
                    Load Default
                </Button>
                <Button onClick={handleSaveLayout} variant='contained'>
                    Save Layout
                </Button>
            </Box>
        </Box>
    );
}

export default Admin;