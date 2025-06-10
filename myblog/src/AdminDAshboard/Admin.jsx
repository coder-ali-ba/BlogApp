import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

function Admin() {
  return (
   <Stack bgcolor={"gray"}  flexDirection={"row"} justifyContent={"space-between"} mx={"10%"} mt={"10px"} borderRadius={"10px"} px={"5px"} py={"5px"} alignItems={"center"}>
      <Typography variant='h4' color='white'>Welcome To Admin</Typography>
      <Stack gap={"40px"} flexDirection={"row"}>
        <Link to="/createblog"><AddIcon fontSize='large' sx={{color:"white"}}></AddIcon>Create Blog</ Link>
        <NotificationsIcon sx={{color:"white"}} fontSize='large'></NotificationsIcon>
        <AccountCircleIcon sx={{color:"white"}} fontSize='large'></AccountCircleIcon>
      </Stack>
   </Stack>
  )
}

export default Admin
