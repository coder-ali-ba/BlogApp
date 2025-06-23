import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase';
import { Alert, Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, CircularProgress, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { grey } from '@mui/material/colors';

function MyBlogs() {
  const Uid = JSON.parse(localStorage.getItem("user"))
  const [myBlogs , setMyBlogs] = useState(null)
  const userUid = JSON.parse(localStorage.getItem("user"))
  const [visible , setVisible] = useState(false)
  const[title , setTitle] = useState("") 
  const[subject , setSubject] = useState("")
  const[desc , setDesc] = useState("")
  const[status, setStatus]= useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [blogId , setBlogId] =useState("")
  // const [showSuccess , setShowSuccess] = useState(false)

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
      })

      getMyBlogs()
    } catch (error) {
      console.log(error.message);     
    }  
  }


  const editMyBlog = (bid) => {
    setBlogId(bid)
    setVisible(true)   
    setMyBlogs(null) 
   

  }




   const updatedBlog = {
      title,
      subject,
      description :desc,
      status : status,
      createdAt :Date.now(),
      imageLink :imageUrl,
      UserId:Uid,
     
   }


  

  const updateBlog = async() => {
 
   try {

   const choose = query(collection(db , "bolgs") , where("createdAt" , "==" , Number(blogId)))
   const b = await getDocs(choose)  

   b.forEach((ele)=>{
     updateDoc(doc(db , "bolgs" , ele.id ) , updatedBlog )
   })

  

  getMyBlogs()

  setVisible(false)
  

    
   } catch (error) {
    console.log(error.message);
    
   }  
  
  }




  return (
    <Stack flexDirection={"row"} flexWrap={"wrap"} gap={"20px"} padding={"30px"} justifyContent={"center"}>
      
      {/* {
        showSuccess &&  <Alert severity="warning">This is a success Alert.</Alert>
      } */}
   
     {!myBlogs ?(<CircularProgress />) : myBlogs.map((blog , index)=>(
        <Stack key={index}>
           <Card sx={{ width: 345,  height:450}} >
             <CardMedia
               component="img"
               alt="green iguana"
               image={blog.imageLink}
               sx={{height:250}}
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
                <Button size="small" id={blog.createdAt} color='white' sx={{backgroundColor:"green"}} onClick=
                {(event)=>{
                  editMyBlog(event.target.id)
                }}>Edit</Button>
                <Button size="small" id={blog.createdAt} color='white'sx={{backgroundColor:"red"}} onClick={(event)=>{deleteBlog(event.target.id)}}>Delete</Button>
             </CardActions>
          </Card>
       </Stack>   
       ))
     } 



    {visible && <Stack width={400} height={500} borderRadius={"10px"} backgroundColor={"grey"} padding={"20px"} gap={"20px"} >

      <Typography textAlign={"center"} variant='h5'>Update Blog</Typography>

       <TextField label="Title" variant="outlined" sx={{color:"white"}} onChange={(event)=>{
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

       <Button variant='contained'  onClick={updateBlog}>Update Blog</Button>

     </Stack> 
    }
    </Stack>

  )
}

export default MyBlogs
