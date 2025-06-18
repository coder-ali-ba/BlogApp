import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase';
import { CircularProgress, Stack } from '@mui/material';

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
   <Stack>
    {!matchId ? (<CircularProgress color='Blue'></CircularProgress>) : (<h1>{matchId.title}</h1>)

    }
   </Stack>
  )
}

export default SingleBlog
