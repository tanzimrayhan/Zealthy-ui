import { Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const DynamicSteps = ({ step, adminConfig, setUserDetails, userDetails }) => {
  const [page2, setPage2] = useState([]);
  const [page3, setPage3] = useState([]);

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
      {step === 2 && page2.map((field, index) => (
        <TextField
          required
          key={index}
          id={field}
          value={userDetails[field]}
          label={field.toUpperCase()}
          multiline= {field ==='aboutMe'? true : false}
          rows= {field ==='aboutMe'? '4' : '1'}
          variant="outlined"
          style={{ marginBottom: '20px' }}
          onChange={(e) => setUserDetails({ ...userDetails, [field]: e.target.value })}
        />
      ))}
      {step === 3 && page3.map((field, index) => (
        <TextField
          required
          key={index}
          id={field}
          value={userDetails[field]}
          label={field.toUpperCase()}
          multiline= {field ==='aboutMe'? true : false}
          rows= {field ==='aboutMe'? '4' : '1'}
          variant="outlined"
          style={{ marginBottom: '20px' }}
          onChange={(e) => setUserDetails({ ...userDetails, [field]: e.target.value })}
        />
      ))}
    </Box>
  )
}

export default DynamicSteps