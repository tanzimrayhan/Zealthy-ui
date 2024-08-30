import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

const DataTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://zealthy-backend.vercel.app/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <Box
            
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 5,
                m: 1,
                borderRadius: 5,
                width: '100%',
                border: '1px solid #bdbdbd',
                backgroundColor: '#fff',
                overflowX: 'auto',
                overflow:'-moz-scrollbars-horizontal',
            }}
        >
            <table style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Email</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Password</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Birthday</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>About Me</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Street Address</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>City</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>State</th>
                        <th style={{ border: '1px solid black', padding: '10px' }}>Zip</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                       <tr key={user._id}>
                       <td style={{ border: '1px solid black', padding: '10px' }}>{user.email}</td>
                       <td style={{ border: '1px solid black', padding: '10px' }}>{user.password}</td>
                       <td style={{ border: '1px solid black', padding: '10px' }}>{new Date(user.birthday).toLocaleDateString()}</td>
                       <td style={{ border: '1px solid black', padding: '10px' }}>{user.aboutMe}</td>
                       <td style={{ border: '1px solid black', padding: '10px' }}>{user.streetAddress}</td>
                       <td style={{ border: '1px solid black', padding: '10px' }}>{user.city}</td>
                       <td style={{ border: '1px solid black', padding: '10px' }}>{user.state}</td>
                       <td style={{ border: '1px solid black', padding: '10px' }}>{user.zip}</td>
                     </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
}

export default DataTable;