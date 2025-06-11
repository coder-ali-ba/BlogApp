import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Admin() {
   const [getForAdmin, setGetForAdmin]= useState([])
  const getblogs = async() => {
    
    let allBlogArray =[]
    const querySnapshot = await getDocs(collection(db, "bolgs"));
    querySnapshot.forEach((blog) => {
      allBlogArray.push(blog.data())     
    });
    
    setGetForAdmin(allBlogArray)

  }

  useEffect(()=>{
    getblogs()
  }, [])
  console.log(getForAdmin);
  

  return (
    <Stack>
        <Stack bgcolor={"gray"}  flexDirection={"row"} justifyContent={"space-between"} mx={"10%"} mt={"10px"} borderRadius={"10px"} px={"5px"} py={"5px"} alignItems={"center"}>
           <Typography variant='h4' color='white'>Welcome To Admin</Typography>
           <Stack gap={"40px"} flexDirection={"row"}>
             <Link to="/createblog"><AddIcon fontSize='large' sx={{color:"white"}}></AddIcon>Create      Blog</ Link>
             <NotificationsIcon sx={{color:"white"}} fontSize='large'></NotificationsIcon>
             <AccountCircleIcon sx={{color:"white"}} fontSize='large'></AccountCircleIcon>
           </Stack>
        </Stack>

        <Stack flexDirection={"row"} border={"2px solid green"} mt={"40px"} mx={"10%"}>

          <Box bgcolor={"gray"} width={"25%"} >uigiuh</Box>
          <Box px={"20px"} >
          {getForAdmin.length == 0 ?
           (<Typography>Not FOund Blogs</Typography>) :
            ( getForAdmin.map((blog , index)=>(
              <Box key={index} mt={"20px"} width={"100%"} bgcolor={"lightGray"} padding={"10px"} borderRadius={"10px"}>
                <Typography variant='h4'>{blog.title}</Typography>
                <Typography variant='h6'>{blog.subject}</Typography>
                <Typography variant='p'>{blog.description}</Typography>
              </Box> 
              ))
            )
          }
          </Box>
        </Stack>
   </Stack>
  )
}

export default Admin
