// import { Box, Button, Container, Stack, Typography } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import { Link, Navigate, useNavigate } from 'react-router-dom'
// import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from '../firebase';
// import NavbarComp from '../components/NavbarComp';


// function MainDashboard() {
//   const navigate = useNavigate()
//     const a = Boolean(localStorage.getItem("type"))
//     const ifAdmin =() =>{
//        if(a){
//        navigate("/admindashboard")
//        }
//        return
//     }

//     useEffect(()=>{
//       ifAdmin()
//     }, [])

//      const [publicBlogs, setPublicBlogs] = useState([])   

//      const getAvailabeBlogs = async() => {
//         const q = query(collection(db, "bolgs"), where("status", "==", false));
//         const querySnapshot = await getDocs(q);

//         let blogs=[]

//         querySnapshot.forEach((doc)=>{
//           const blogInfo =doc.data()
//           // console.log(blogInfo);
//              blogs.push(blogInfo)
//         }) 
        
//         setPublicBlogs(blogs)
//       }

     
      

//       useEffect(()=>{
//           getAvailabeBlogs()
//        }, [])
     
//         const imageStyle = {
//           width:"100%",
//           height :"70%",
//           borderRadius:"10px"
//         }
//   return (

    
//     <Stack >
//       {/* <Button onClick={getAvailabeBlogs}>get</Button> */}

//       <NavbarComp />
      

//       {/* <Container className='w-100   flex'> */}


        


//         <Box   sx={{ marginY:"20px",marginX:"75px", display:"flex", flexWrap:"wrap", gap:"30px", justifyContent:"center"}} className='bg-gray-100 '>
          
//           {publicBlogs ==[] ? <Typography color='black'>not Found</Typography> :
//             publicBlogs.map((post , index)=>(
//               <Stack key={index} gap={"10px"}  width={"340px"} borderRadius={"10px"}  mt={"20px"} bgcolor={"black"} color={"white"}>

//                 <img src={post.imageLink || null}  alt="not provided" style={imageStyle} />  
//                 <Box paddingLeft={"10px"}>
//                    <Typography variant={"h5"} color='black'>Title : {post.title}</Typography>        
//                    <Typography variant='h6'>subject : {post.subject}</Typography>
//                    <Typography>{post.description}</Typography>
//                    <Typography>{new Date(post.createdAt).getDate()}</Typography>
//                 </Box>
//               </Stack>))
//            }
//         </Box>
//       {/* </Container> */}

        
//     </Stack>
//   )
// }

// export default MainDashboard




import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { CircularProgress, Stack } from '@mui/material';
import NavbarComp from '../components/NavbarComp';




export default function RecipeReviewCard() {

  
   const navigate = useNavigate()
    const a = Boolean(localStorage.getItem("type"))
    const ifAdmin =() =>{
       if(a){
       navigate("/admindashboard")
       }
       return
    }

    useEffect(()=>{
      ifAdmin()
    }, [])

     const [publicBlogs, setPublicBlogs] = useState([])   

     const getAvailabeBlogs = async() => {
        const q = query(collection(db, "bolgs"), where("status", "==", false));
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



  return (
    <>
    <NavbarComp/>
    <Stack className='bg-gray-100' marginX={"75px"} flexDirection={"row"} flexWrap={"wrap"} gap={"10px"} mt={"10px"} pt={"10px"} justifyContent={"space-around"}>
      {publicBlogs.length == 0 ? (<CircularProgress></CircularProgress>) : (
        publicBlogs.map((blog , index)=>(
       <Card key={index} sx={{ maxWidth: 345 }}>  
         <CardMedia
            component="img"
            height="194"
            image={blog.imageLink}
                alt="Paella dish"
         />
       <CardContent>
          <Typography  variant='h5' sx={{ color: 'black' }}>
            {blog.title}
          </Typography>
          <Typography variant='h6' sx={{ color: 'text.secondary' }}>
            {blog.subject}
          </Typography>
          <Typography  sx={{ color: 'text.secondary' }}>
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
      )}
   
    </Stack>
  </>
  );
}

