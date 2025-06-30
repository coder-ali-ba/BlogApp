// import React, { useEffect, useState } from 'react'
// import NavbarComp from '../components/NavbarComp'
// import CreateBlog from '../CreateBlog/CreateBlog'
// import { Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material'
// import { collection, getDocs } from "firebase/firestore";
// import { db } from '../firebase';
// import { Link } from 'react-router-dom';


// function User() {
 
//   const [allBlogs , setAllBlogs] = useState([])

//   const getAll = async() => {
//     const querySnapshot = await getDocs(collection(db, "bolgs"));

//     const blogArray = []

//     querySnapshot.forEach((doc)=>{    
//       blogArray.push(doc.data())     
               
//     })
//     setAllBlogs(blogArray)
       
//   }


//   useEffect(()=>{
//     getAll()
//   }, [])
  

//   return (
//     <Container>
//       <NavbarComp />

//       <Stack flexDirection={"row"}>
//         <Button variant='contained' sx={{margin:"auto", marginTop:"20px"}} >
//           <Link to='/logout'>Log Out</Link>    
//         </Button>
//       </Stack>



//       <Stack mt={"20px"} flexDirection={"row"}>
        
         

//           <Box  display={"flex"} flexDirection={"row"} gap={"10px"} alignItems={"center"} flexWrap={"wrap"} >
//                { allBlogs.length == 0 ?( <Box width={"100%"} textAlign={"center"}><CircularProgress color='blue'></CircularProgress></Box>)  :
//                allBlogs.map((blog , index)=>(

//                <Box key={index} mt={"20px"} width={"340px"} height={"400px"} className='rounded-lg mx-2' bgcolor={"gray"}  >
//                   <img src={blog.imageLink || null} sx={{height:"50%", width:"1005"}}  alt="not provided" />
//                  <Box>
//                    <Typography variant='h4'>Title : {blog.title}</Typography>
//                    <Typography variant='h6'>subject : {blog.subject}</Typography>
//                    <Typography variant='p'>Description : {blog.description}</Typography>
//                  </Box>
//                </Box>

//                ))
//                 }
//           </Box>
//       </Stack>
      
//     </Container>
//   )
// }

// export default User





import  React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Button, CircularProgress, Stack } from '@mui/material';
import NavbarComp from '../components/NavbarComp';
import { Link } from 'react-router-dom';


export default function User() {  

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
  
    <>
    <NavbarComp />
   <Stack flexDirection={"row"}>
        <Button variant='contained' sx={{margin:"auto", marginTop:"20px", backgroundColor:"red"}} >
           <Link to='/logout'>Log Out</Link>    
        </Button>
    </Stack>
    <Stack className='bg-gray-100' flexDirection={'row'} gap={"10px"} justifyContent={"space-around"} mt={"10px"} marginX={"75px"} pt={"10px"} mb={"10px"} flexWrap={"wrap"}>
    


     { allBlogs.length == 0 ?( <CircularProgress></CircularProgress>)  : 
        allBlogs.map((blog , index)=>(
       <Card key={index} sx={{ maxWidth: 345 }}>
     
      <CardMedia
        component="img"
        height="194"
        image={blog.imageLink}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant='h5' sx={{ color: 'black' }}>
          {blog.title}
        </Typography>
        <Typography variant='h6'  sx={{ color: 'text.secondary' }}>
          {blog.subject}
        </Typography>
        <Typography   sx={{ color: 'text.secondary' }}>
          {blog.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
   
    </Card>

      ))
    
   }
  </Stack>
 </>
 )
}
