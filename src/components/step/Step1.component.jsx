import { Box, TextField } from '@mui/material'
import React from 'react'

const Step1 = ({userDetails, setUserDetails}) => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 5,
                    m: 1,
                    borderRadius: 5,
                    border: '1px solid #bdbdbd'
                }}
            >
                <TextField
                    required
                    id="email"
                    label="Email"
                    value={userDetails.email}
                    variant="outlined"
                    type="email"
                    style={{ marginBottom: '20px' }}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                />
                <TextField
                    required
                    id="password"
                    label="Password"
                    value={userDetails.password}
                    variant="outlined"
                    type="password"
                    onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                />
            </Box >
        </>
    )
}

export default Step1