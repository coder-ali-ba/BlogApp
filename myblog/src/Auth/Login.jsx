import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { app, auth, db } from '../firebase'
import { data, Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Bounce, toast } from 'react-toastify';
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
function Login() {

    const todashboard =useNavigate()

    // console.log("firbase :" , app);
    const[logEmail , setLogEmail] = useState("")
    const[logPassword , setLogPassword] = useState("")
    // const[isAdmin, setIsAdmin]=useState(false)

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
       const userCredential = await signInWithEmailAndPassword(auth , logEmail , logPassword)
       const user = userCredential.user;
       console.log("user UID" , user.uid);
       localStorage.setItem("user" , JSON.stringify(user.uid))

        const q = query(collection(db, "Users"), where("userPassword", "==", logPassword));
        const querySnapshot = await getDocs(q);
         if (querySnapshot.empty) {
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
          return;
        }
         const userData = querySnapshot.docs[0].data();

        if (userData.userType === "admin") {
            toast('Admin LogedIn Successfully', {
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
           todashboard("/admindashboard");
         } else if (userData.userType === "user") {
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
           todashboard("/userdashboard");

          
         } else {
               toast.error('User Not Found', {
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
  
        
     

      // if(adminUsers[0].userPassword != logPassword){
      //       todashboard("/userdashboard") 
      //       return
      // }


      } catch (error) {
          toast.error(`${error.message}`, {
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
