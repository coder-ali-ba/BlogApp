import { collection, doc, getDocs, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';


function SingleBlog() {
    const [active , setActive ]= useState(Boolean)
    
    const location =useLocation()
    const Id = location.state?.blogId;

    const[singleblog , setSingleBlog] = useState([])


    const getSingleBlog = async() => {
       setSingleBlog([])

      let emptyArray =[]
      const res = await getDocs(collection(db , "bolgs"))   
      res.forEach((doc) => {
        emptyArray.push(doc.data())    
        });
        setSingleBlog(emptyArray)
    }
    
    

    useEffect(()=>{
          getSingleBlog()
    }, [])


    const matchId =singleblog.find((blog)=>{
        return  blog.createdAt == Id
    })
   

    const  toggleActive =async () => {
      
      try {
        // console.log(matchId.createdAt);
        const a =matchId.createdAt
        
        const response = query(collection(db , "bolgs") , where("createdAt" , "==" , a))
        const q= await getDocs(response)
        
        q.forEach((user)=>{
         
          let currentStatus = user.data().status
          const updated = doc(db, "bolgs", user.id);
             updateDoc(updated, {
              status : !currentStatus
           }); 
           setActive(currentStatus)        
          }
        )
       
        getSingleBlog()
       
        
      } catch (error) {
        console.log(error.message);
        
      }
     
    }
    
 
    
  return (
   <Stack  >
    {!matchId ? (<CircularProgress color='Blue'></CircularProgress>) : (
      <Stack flexDirection={"row"} gap={"30px"} width={"800px"} margin={"auto"}  justifyContent={"center"} className='flex flex-wrap md:flex-nowrap p-2 md:p-8' sx={{backgroundColor:"whitesmoke", boxShadow:"2px 2px  lightgray", borderRadius:"10px", marginTop:"30px"}  }>
        <Stack width={"300px"}>
          <img src={matchId.imageLink} alt="not Published PC" style={{borderRadius:"10px"}} />
        </Stack>

        <Stack gap={"20px"} width={"500px"}>        
          <Typography variant='h4' >{matchId.title}</Typography>
          <Typography variant='h6' >{matchId.subject}</Typography>
          <Typography  >{matchId.description}</Typography>
          <Button  variant='contained'   sx={{
            backgroundColor: active ? 'green' : 'orange',
            color: active ? 'white' : 'black',
           '&:hover': {
            backgroundColor: active ? '#2e7d32' : '#fdd835',
             },
            }} onClick={toggleActive}>{active ? "Public Blog" : "Private Blog"}
          </Button>
        </Stack>
      </Stack>   
    )
    }
   </Stack>
  )
}

export default SingleBlog
