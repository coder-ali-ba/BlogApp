import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { CircularProgress, Stack, Typography } from '@mui/material';

function MyBlogs() {

  const [myBlogs , setMyBlogs] = useState(null)
  const userUid = JSON.parse(localStorage.getItem("user"))
   
   const getMyBlogs = async() => {
        const emptyArray =[];

        const q = query(collection(db, "bolgs"), where("UserId", "==", userUid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            emptyArray.push(doc.data())               
        })
         
         setMyBlogs(emptyArray)       
   }
    
    
  useEffect(()=>{
    getMyBlogs()
   } , [])

  return (
    <Stack>
   
     {!myBlogs ?(<CircularProgress />) : myBlogs.map((blog , index)=>(
        <Stack key={index}>
          <Typography component={'h3'}>{blog.title}</Typography>
        </Stack>   
     ))
     } 
    </Stack>

  )
}

export default MyBlogs
