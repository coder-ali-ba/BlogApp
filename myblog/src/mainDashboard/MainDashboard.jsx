import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';


function MainDashboard() {
     const getAvailabeBlogs = async() => {
        const q = query(collection(db, "bolgs"), where("status", "==", "public"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
          const blogInfo =doc.data()
          console.log(blogInfo);
          
        })       
      }
       useEffect(()=>{
          getAvailabeBlogs()
       }, [])
     

  return (

    
    <Stack >
      {/* <Button onClick={getAvailabeBlogs}>get</Button> */}

      {/* NavBar */}
      <Container className='w-100 flex justify-between my-4 bg-gray-500 py-4' sx={{color:"white"}} >
        <Box display={"flex"} gap={"5px"}>
          <ImportContactsOutlinedIcon color='light'> </ImportContactsOutlinedIcon>
          <Box component="h4" sx={{color:"white"}}>BlogApp</Box>
        </Box>

        <Box display={"flex"} gap={"10px"}>
          <Link>Home</Link>
          <Link>Trending</Link>
          <Link>Most Popular</Link>
          <Link>About</Link>
        </Box>
        
        <Button variant="contained">
           <Link to="/login"  >logIn</Link>
        </Button>
        
      </Container>
      

      <Container className='w-100 h-screen bg-gray-500 flex'>
        <Box  width={"20%"} ></Box>
        <Box  width={"80%"} sx={{backgroundColor:"white", marginY:"20px"}}>
          
          {
            <Typography></Typography>
          }
          

        </Box>
      </Container>

        
    </Stack>
  )
}

export default MainDashboard
