import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { app, auth, db } from '../firebase'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Bounce, toast } from 'react-toastify';
import { collection, query, where, getDocs } from "firebase/firestore";
function Login() {

    // const todashboard =useNavigate()

    // console.log("firbase :" , app);
    const[logEmail , setLogEmail] = useState("")
    const[logPassword , setLogPassword] = useState("")

    const logInHandler = async() => {

      
       
         if(logEmail ==""  || logPassword ==""){
           toast.error('Please Fill All Fields', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
           });
        
        return
      }  
     
      try {
        await signInWithEmailAndPassword(auth , logEmail , logPassword)
        toast('User LogedIn Successfully', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
          });


        // todashboard("/admindashboard")


        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach((doc) => {
               // doc.data() is never undefined for query doc snapshots
              //  const loggedInUser =doc.data().userPassword === logPassword
              //  console.log(loggedInUser);
              
              // const a = doc.data()
              // console.log(a.userPassword === logPassword);
              
              // return a.userPassword === logPassword

              const docRef = doc(db, "Users", user.uid);
              const docSnap = await getDoc(docRef);
       });
      
       

      } catch (error) {
          toast.error('Invalid Email or Password', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
           });
        
      }
    }
    
  return (
   <Stack border={"2px solid yellow"} padding={"20px"} backgroundColor={"lightgray"} maxWidth={"500px"} margin={"auto"} gap={"10px"} borderRadius={"20px"} marginTop={"50px"}>
       <Typography variant='h4' fontWeight={"bold"} textAlign={"center"}>LogIn</Typography>
       <TextField label='EmailAddress' variant='standard' color='success'
       onChange={(event)=>{
            setLogEmail(event.target.value)
       }}>
       </TextField>
       <TextField label='Password' variant='standard' color='success' type='password'
       onChange={(event)=>{
        setLogPassword(event.target.value)
       }}> 
       </TextField>


       <Typography >Don't have an account
            <Link className='text-blue-500' to="/signup"> Signup</Link>
       </Typography> 

       <Button variant='contained' sx={{marginTop:"20px"}} onClick={logInHandler}>LogIn</Button>
   </Stack>
  )
}

export default Login
