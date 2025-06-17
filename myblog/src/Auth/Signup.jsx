import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase.js'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Bounce, toast } from 'react-toastify'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'






function Signup() {
  const [fullname, setFullName]= useState("")
  const [Email, setEmail]= useState("")
  const [Password, setPassword]= useState("")
  const [inProgress , setInProgress]=useState(false)
  const [imageURL , setImageURL] = useState("")

  const refFile = useRef(null)
  const navigate = useNavigate()
 
 
 
  const userObj ={
         name : fullname,
         emailAddress :Email,
         userPassword : Password,
         createdAt :Timestamp.now(),
         userType :"user",
         profilePic : imageURL
   }
 

     const getFileInput = () => {
      refFile.current.click()
    }
  
   const getImageURL = async(event) => {
    const myFile =event.target.files[0] 
  
         const formData = new FormData();

    formData.append('file', myFile);
    formData.append('upload_preset', 'firstpreset');

    try {
        const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dpqs4s6ed/image/upload', 
        formData );
        
         setImageURL(response.data.secure_url)
         console.log(response.data.secure_url);
         
         
    } catch (error) {
      console.log(error.message);
    }
    
   }





  const signInHandler = async() => {
 
   setInProgress(true)
    try {
      if(fullname =="" || Email =="" || Password ==""){
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
        setInProgress(false)
        return
      }   
     const userCredential = await createUserWithEmailAndPassword(auth , Email , Password) 
     const uid =userCredential.user.uid
    setInProgress(false)

       toast('Successfully signed in', {
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
        
        
        
        await setDoc(doc(db, "Users" , uid),userObj)

        navigate('/')
    } catch (error) {
      console.log(error.message);
      setInProgress(true)
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

      setInProgress(false)

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

      
      <input type="file" hidden ref={refFile}  onChange={getImageURL}/>
      <Typography>
          Add Profile Picture 
          <AddIcon onClick={getFileInput}></AddIcon>
         </Typography>
    

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
