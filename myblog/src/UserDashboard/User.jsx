import React, { useEffect, useState } from 'react'
import NavbarComp from '../components/NavbarComp'
import CreateBlog from '../CreateBlog/CreateBlog'
import { Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Link } from 'react-router-dom';


function User() {
 
  const [allBlogs , setAllBlogs] = useState([])

  const getAll = async() => {
    const querySnapshot = await getDocs(collection(db, "bolgs"));

    const blogArray = []

    querySnapshot.forEach((doc)=>{    
      blogArray.push(doc.data())     
               
    })
    setAllBlogs(blogArray)
       
  }


  useEffect(()=>{
    getAll()
  }, [])
  

  return (
    <Container>
      <NavbarComp />

      <Stack flexDirection={"row"}>
        <Button variant='contained' sx={{margin:"auto", marginTop:"20px"}} >
          <Link to='/logout'>Log Out</Link>    
        </Button>
      </Stack>



      <Stack mt={"20px"} flexDirection={"row"}>
        
         

          <Box  display={"flex"} flexDirection={"row"} gap={"10px"} alignItems={"center"} flexWrap={"wrap"} >
               { allBlogs.length == 0 ?( <Box width={"100%"} textAlign={"center"}><CircularProgress color='blue'></CircularProgress></Box>)  :
               allBlogs.map((blog , index)=>(

               <Box key={index} mt={"20px"} width={"340px"} height={"400px"} className='rounded-lg mx-2' bgcolor={"gray"}  >
                  <img src={blog.imageLink || null} sx={{height:"50%", width:"1005"}}  alt="not provided" />
                 <Box>
                   <Typography variant='h4'>Title : {blog.title}</Typography>
                   <Typography variant='h6'>subject : {blog.subject}</Typography>
                   <Typography variant='p'>Description : {blog.description}</Typography>
                 </Box>
               </Box>

               ))
                }
          </Box>
      </Stack>
      
    </Container>
  )
}

export default User
