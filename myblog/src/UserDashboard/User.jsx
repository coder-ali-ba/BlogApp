import React, { useEffect, useState } from 'react'
import NavbarComp from '../components/NavbarComp'
import CreateBlog from '../CreateBlog/CreateBlog'
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
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
    <div>
      <NavbarComp />

      <Stack>
       <Button variant='contained' sx={{margin:"auto", marginTop:"20px"}} >
        <Link to="/CreateBlog">Add Blog</Link>
       </Button>
      </Stack>



      <Stack mt={"20px"} flexDirection={"row"}>
        
          <Box width={"25%"} sx={{backgroundColor:"yellow"}} ></Box>

          <Box>
               { allBlogs.length == 0 ?( <Box width={"100%"} textAlign={"center"}><CircularProgress color='blue'></CircularProgress></Box>)  :
               allBlogs.map((blog , index)=>(

               <Box key={index} mt={"20px"} className='rounded-lg mx-2' bgcolor={"gray"}  display={"flex"} flexDirection={"row"} gap={"10px"} alignItems={"center"} >
                  <img src={blog.imageLink}  className='w-50 rounded-lg' alt="" />
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
      
    </div>
  )
}

export default User
