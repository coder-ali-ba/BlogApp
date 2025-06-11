import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import NavbarComp from '../components/NavbarComp';


function MainDashboard() {

     const [publicBlogs, setPublicBlogs] = useState([])   

     const getAvailabeBlogs = async() => {
        const q = query(collection(db, "bolgs"), where("status", "==", "public"));
        const querySnapshot = await getDocs(q);

        let blogs=[]

        querySnapshot.forEach((doc)=>{
          const blogInfo =doc.data()
          // console.log(blogInfo);
             blogs.push(blogInfo)
        }) 
        
        setPublicBlogs(blogs)
      }

     
      

      useEffect(()=>{
          getAvailabeBlogs()
       }, [])
     
        console.log(publicBlogs);
  return (

    
    <Stack >
      {/* <Button onClick={getAvailabeBlogs}>get</Button> */}

      <NavbarComp />
      

      <Container className='w-100   flex'>
        <Box  width={"20%"} ></Box>
        <Box  width={"80%"} sx={{ marginY:"20px"}} className='bg-gray-100'>
          
          {publicBlogs ==[] ? <Typography color='black'>not Found</Typography> :
            publicBlogs.map((post , index)=>(
              <Stack key={index}  px={"20px"} mt={"20px"} bgcolor={"light"}>
                <Typography variant={"h5"} color='black'>Title : {post.title}</Typography>
                 <Typography variant='h6'>subject : {post.subject}</Typography>
                 <Typography>{post.description}</Typography>
                 <Typography>{new Date(post.createdAt).getDate()}</Typography>
              </Stack>
               
            ))
          }
          

        </Box>
      </Container>

        
    </Stack>
  )
}

export default MainDashboard
