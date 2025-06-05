import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase.js'
import { createUserWithEmailAndPassword } from 'firebase/auth'


function Signup() {
  const [fullname, setFullName]= useState("")
  const [Email, setEmail]= useState("")
  const [Password, setPassword]= useState("")

  let inProgress = false;

  const signInHandler = async() => {
    
    try {
      inProgress=true
    await createUserWithEmailAndPassword(auth , Email , Password)
    console.log("Name :" , fullname);
    console.log("Email :" , Email);
    console.log("Password :" , Password);
     
     inProgress=false

    } catch (error) {
      console.log(error.message);
      inProgress=true
    }
    
   }
  
  return (
    
    <Stack gap={"50px"} maxWidth={"450px"} margin={"auto"} padding={"30px"}>
      <Typography variant='h4' textAlign={"center"}>SignUp</Typography>

      <TextField label="FullName" variant='standard'
        onChange={(event)=>{
          setFullName(event.target.value) 
        }}>
      </TextField>


      <TextField label="EmailAddress" variant='standard'
        onChange={(event)=>{
          setEmail(event.target.value)
        }}>
      </TextField>


      <TextField label="Password" variant='standard'
      onChange={(event)=>{
        setPassword(event.target.value)
      }}>
      </TextField>



      <Typography>Already have an account 
        <Link className='text-blue-400' to="/"> LogIn</Link>
      </Typography>
       <Button variant='contained' onClick={signInHandler}>
        {inProgress && <CircularProgress color='white' />}
           
           Signin</Button>
      
    
    
    </Stack>
  )
}

export default Signup
