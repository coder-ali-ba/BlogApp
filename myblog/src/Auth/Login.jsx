import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { app } from '../firebase'
import { Link } from 'react-router-dom';

function Login() {
    console.log("firbase :" , app);
    
  return (
   <Stack border={"2px solid yellow"} padding={"20px"} backgroundColor={"lightgray"} maxWidth={"500px"} margin={"auto"} gap={"10px"} borderRadius={"20px"} marginTop={"50px"}>
       <Typography variant='h4' fontWeight={"bold"} textAlign={"center"}>LogIn</Typography>
       <TextField label='EmailAddress' variant='standard' color='success'> </TextField>
       <TextField label='Password' variant='standard' color='success' type='password'> </TextField>


       <Typography>Don't have an account
            <Link to="/signup"> Signup</Link>
       </Typography> 

       <Button variant='contained' sx={{marginTop:"20px"}}>LogIn</Button>
   </Stack>
  )
}

export default Login
