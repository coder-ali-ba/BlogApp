import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Admin() {
  return (
   <Stack bgcolor={"gray"}  flexDirection={"row"} justifyContent={"space-between"} mx={"10%"} mt={"10px"} borderRadius={"10px"} px={"5px"} py={"5px"} alignItems={"center"}>
      <Typography variant='h4' color='white'>Welcome To Admin</Typography>
      <Box>
        <NotificationsIcon sx={{color:"white"}} fontSize='large'></NotificationsIcon>
        <AccountCircleIcon sx={{color:"white"}} fontSize='large'></AccountCircleIcon>
      </Box>
   </Stack>
  )
}

export default Admin
