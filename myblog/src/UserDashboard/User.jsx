import React, { useEffect, useState } from 'react'
import NavbarComp from '../components/NavbarComp'
import CreateBlog from '../CreateBlog/CreateBlog'
import { Box, Button, Stack, Typography } from '@mui/material'
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
  console.log(allBlogs);

  return (
    <div>
      <NavbarComp />
      <Stack>
       <Button variant='contained' sx={{margin:"auto", marginTop:"20px"}} >
        <Link to="/CreateBlog">Add Blog</Link>
      </Button>
      </Stack>

      <Box border={"2px solid yellow"} mt={"20px"}>
        { allBlogs.length == 0 ?( <Typography variant='h1'>Not Found</Typography>) :
          allBlogs.map((blog , index)=>(

            <Stack key={index} mt={"20px"} px={"20px"}>
              <Typography variant='h4'>Title : {blog.title}</Typography>
              <Typography variant='h6'>subject : {blog.subject}</Typography>
              <Typography variant='p'>Description : {blog.description}</Typography>
            </Stack>
          ))
        }
      </Box>
      
    </div>
  )
}

export default User
