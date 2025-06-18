import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase'
import { CircularProgress, Stack, Typography } from '@mui/material'

function UserAccount() {
   const location =useLocation()
   const userPassword = location.state?.userId

 
   const[allUser, setAllUser]= useState([])
  
  const getAllUsers = async() => {
    let allUsers =[]
    try {
      const users = await getDocs(collection(db , "Users"));
      users.forEach((user)=>{
      // console.log(user.data()); 
      allUsers.push(user.data())  
    })
  
    setAllUser(allUsers)
    
    } catch (error) {
      console.log(error.message);
      
    }  
  }
  
  useEffect(()=>{
    getAllUsers()
  } , [])

const a= allUser.find((user)=>{
    return user.userPassword == userPassword
})
 
  return (
  
    <Stack>    
       {!a ? (<CircularProgress  color='Blue'></CircularProgress>) : (
           <Stack className='bg-blue-400 m-auto text-center' padding={"40px"} borderRadius={"10px"} mt={"30px"}>
            <Typography variant='h4' >Account Name : {a.name}</Typography>
            <img style={{borderRadius:"50%", margin:'auto'}}  className='w-75 h-75'  src={a.profilePic} alt="#" />
            <Typography>Email Address : {a.emailAddress}</Typography>
            {/* <Typography>Craeted At : {a.createdAt}</Typography> */}
            <Typography>User Type : {a.userType}</Typography>
           </Stack>
       ) }     
    </Stack>
  )
}

export default UserAccount
