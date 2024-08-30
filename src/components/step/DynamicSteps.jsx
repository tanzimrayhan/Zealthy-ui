import { Alert, Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';


const DynamicSteps = ({ step, adminConfig, setUserDetails, userDetails }) => {
  const [page2, setPage2] = useState([]);
  const [page3, setPage3] = useState([]);
  const [error, setError] = useState('')

  useEffect(() => {
    parseFields()
  }, [adminConfig])

  const parseFields = () => {

    for (let key in adminConfig) {
      let fields = []
      if (key === 'page2') {
        fields = fields.concat(adminConfig[key])
        setPage2(adminConfig[key])
      }
      if (key === 'page3') {
        fields = fields.concat(adminConfig[key])
        setPage3(adminConfig[key])
      }
    }
  }

  const isValidBirthday = (date) => {
    if (date > new Date()) {
      setError('Birthday cannot be a future date');
      return false;
    }
    else if (date < new Date()) {
      setError('');
      return true;
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      p: 5,
      m: 1,
      borderRadius: 1,
      border: '1px solid #bdbdbd'
    }}
    >
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {step === 2 && page2.map((field, index) => (
        field === 'birthday' ? (
          <LocalizationProvider full dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                required
                key={index}
                id={field}
                label={field.toUpperCase()}
                variant="outlined"
                sx={{ width: '100%' }}
                defaultValue={dayjs(userDetails[field])}
                disableFuture
                style={{ marginBottom: '20px' }}
                onChange={(date) => isValidBirthday(date) ? setUserDetails({ ...userDetails, [field]: date }) : setUserDetails({ ...userDetails, [field]: '' })} />
            </DemoContainer>
          </LocalizationProvider>

        ) : (
          <TextField
            required
            key={index}
            type={field === 'zip' ? 'number' : 'text'}
            id={field}
            value={userDetails[field]}
            label={field.toUpperCase()}
            multiline={field === 'aboutMe' ? true : false}
            rows={field === 'aboutMe' ? '4' : '1'}
            variant="outlined"
            style={{ marginBottom: '20px' }}
            onChange={(e) => setUserDetails({ ...userDetails, [field]: e.target.value })}
          />
        )
      ))}
      {step === 3 && page3.map((field, index) => (
        field === 'birthday' ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker required
                key={index}
                id={field}
                sx={{ width: '100%' }}
                defaultValue={dayjs(userDetails[field])}
                disableFuture
                label={field.toUpperCase()}
                variant="outlined"
                style={{ marginBottom: '20px' }}
                onChange={(date) => isValidBirthday(date) ? setUserDetails({ ...userDetails, [field]: date }) : setUserDetails({ ...userDetails, [field]: '' })} />
            </DemoContainer>
          </LocalizationProvider>
        ) : (
          <TextField
            required
            key={index}
            type={field === 'zip' ? 'number' : 'text'}
            id={field}
            value={userDetails[field]}
            label={field.toUpperCase()}
            multiline={field === 'aboutMe' ? true : false}
            rows={field === 'aboutMe' ? '4' : '1'}
            variant="outlined"
            style={{ marginBottom: '20px' }}
            onChange={(e) => setUserDetails({ ...userDetails, [field]: e.target.value })}
          />
        )
      ))}
    </Box>
  )
}

export default DynamicSteps