import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, CircularProgress, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function MyBlogs() {

  const [myBlogs , setMyBlogs] = useState(null)
  const userUid = JSON.parse(localStorage.getItem("user"))
  const [visible , setVisible] = useState(false)
  const[title , setTitle] = useState("") 
  const[subject , setSubject] = useState("")
  const[desc , setDesc] = useState("")
  const[status, setStatus]= useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [blogId , setBlogId] =useState("")

  const fileRef = useRef(null)

   const addImage = () => {
      fileRef.current.click();
  }

    const handleFileChange = async(event) => {
    const file = event.target.files[0];
    
     const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'firstpreset');

    try {
        const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dpqs4s6ed/image/upload', 
        formData );
        
         setImageUrl(response.data.secure_url)
         console.log(response.data.secure_url);
         
         
    } catch (error) {
      console.log(error.message);
      
    }
  };

   
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

  const deleteBlog = async(a) => {
    setMyBlogs(null)   
    try {     
    
      const q = query(collection(db , "bolgs") , where("createdAt" , "==" , Number(a)))
      const querySnapshot =await getDocs(q)
     
      querySnapshot.forEach((bl)=>{  
         deleteDoc(doc(db, "bolgs", bl.id)); 
         console.log(bl.data());
      })
      getMyBlogs()
    } catch (error) {
      console.log(error.message);     
    }  
  }


  const editMyBlog = () => {
    setVisible(true)   
  }

  const updateBlog = () => {
   const updatedBlog = {
    title,
      subject,
      description :desc,
      status : status,
      createdAt :Date.now(),
      imageLink :imageUrl,
      // UserId:Uid,
      //  blogId
   }

   


   console.log(updatedBlog);
   

  }




  return (
    <Stack flexDirection={"row"} flexWrap={"wrap"} gap={"20px"} padding={"30px"} justifyContent={"center"}>
   
     {!myBlogs ?(<CircularProgress />) : myBlogs.map((blog , index)=>(
        <Stack key={index}>
           <Card sx={{ maxWidth: 345 }}>
             <CardMedia
               component="img"
               alt="green iguana"
               height="140"
               image={blog.imageLink}
              />
               <CardContent>
                   <Typography gutterBottom variant="h5" component="div">
                     {blog.title}
                   </Typography>
                   <Typography gutterBottom variant="h5" component="div">
                     {blog.subject}
                   </Typography>
                   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                     {blog.description}
                   </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color='white' sx={{backgroundColor:"green"}} onClick={editMyBlog}>Edit</Button>
                <Button size="small" id={blog.createdAt} color='white'sx={{backgroundColor:"red"}} onClick={(event)=>{deleteBlog(event.target.id)}}>Delete</Button>
             </CardActions>
          </Card>
       </Stack>   
       ))
     } 

    {visible && <Stack width={"300px"} height={"400px"} backgroundColor={"yellow"}>

       <TextField label="Title" variant="outlined" onChange={(event)=>{
        setTitle(event.target.value)
       }} />

       <TextField label="Subject" variant="outlined" onChange={(event)=>{
        setSubject(event.target.value)
       }} />

       <TextField label="Description" variant="outlined" multiline onChange={(event)=>{
        setDesc(event.target.value)
       }}/>

       <Box textAlign={"left"} display={"flex"} alignItems={"center"}> 
          <FormControlLabel control={<Checkbox onChange={(event)=>{
             setStatus(event.target.checked)
           }}/>} />
          <Typography>Publish Privately</Typography>
       </Box>

        <input type="file" hidden ref={fileRef} onChange={handleFileChange} /> 
         <Typography>
          Add Picture 
          <AddIcon onClick={addImage}></AddIcon>
         </Typography>

       <Button variant='contained' onClick={updateBlog}>Update Blog</Button>

     </Stack> 
    }
    </Stack>

  )
}

export default MyBlogs
