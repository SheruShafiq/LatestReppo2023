import { Stack, Typography } from '@mui/material'
import React from 'react'

const Unauthorized = () => {
  return (
    <Stack 
        sx={{
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        }}
    >
        <Typography variant="h1">401: Unauthorized</Typography>
        <Typography variant="h2">Seems like you are not authorized to view this page</Typography>
    </Stack>
  )
}

export default Unauthorized