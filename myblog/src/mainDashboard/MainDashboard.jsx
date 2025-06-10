import { Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function MainDashboard() {
  return (
    <Stack>
         <h1>MainDashboard</h1>

        <Link to="/login">logIn</Link>
    </Stack>
  )
}

export default MainDashboard
