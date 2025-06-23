import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { color } from '@cloudinary/url-gen/qualifiers/background';

function SingleBlog() {
    const location =useLocation()
    const Id = location.state?.blogId;

    const[singleblog , setSingleBlog] = useState([])


    const getSingleBlog = async() => {
      let emptyArray =[]
      const res = await getDocs(collection(db , "bolgs"))   
      res.forEach((doc) => {
        emptyArray.push(doc.data())
        });
        setSingleBlog(emptyArray)
    }
    console.log(singleblog);
    

    useEffect(()=>{
          getSingleBlog()
    }, [])


    const matchId =singleblog.find((blog)=>{
        return  blog.createdAt == Id
    })
    console.log(matchId);
    
 
    
  return (
   <Stack  >
    {!matchId ? (<CircularProgress color='Blue'></CircularProgress>) : (
      <Stack flexDirection={"row"} gap={"30px"} minWidth={500} justifyContent={"center"} className='flex flex-wrap md:flex-nowrap p-2 md:p-8' sx={{backgroundColor:"whitesmoke", boxShadow:"2px 2px  lightgray"} }>
        <Stack>
          <img src={matchId.imageLink} alt="not Published PC" />
        </Stack>

        <Stack gap={"20px"}>        
          <Typography variant='h4' >{matchId.title}</Typography>
          <Typography variant='h6' >{matchId.subject}</Typography>
          <Typography  >{matchId.description}</Typography>
          <Button  variant='contained' color='error'>Delete Blog</Button>
        </Stack>
      </Stack>   
    )
    }
   </Stack>
  )
}

export default SingleBlog
