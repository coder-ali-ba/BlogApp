import React, { useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { addDoc, collection } from "firebase/firestore"; 
import { db } from '../firebase';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';




function CreateBlog() {
  const [title , setTitle] = useState("")
  const [subject , setSubject] = useState('')
  const [desc, setDesc] = useState("")
  const[status, setStatus]= useState(false)
  const [imageUrl, setImageUrl] = useState("")
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


  const addBlogHandler = async() => {
    const addBlog = {
      title,
      subject,
      description :desc,
      status : status,
      createdAt :Date.now(),
      imageLink :imageUrl
    }
    try {
     
     


      // console.log("title : " , title);
      // console.log("subject :" ,subject);
      // console.log("description :" ,desc);

      if(title == "" || subject == "" || desc == ""){
          toast.error("Please fill all fields", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
              });
              return
       }
     
     const docRef = await addDoc(collection(db, "bolgs"),addBlog)
     console.log(docRef);

      toast('Successfully created your blog', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
        });
      
    } catch (error) {
              toast.error(error, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
              });
    }
    
    
   
  }


  return (
    <Stack width={"450px"} sx={{margin:"auto", textAlign:"center"}}>

        <Typography variant={'h4'}>Create Blog</Typography>

        <Typography variant={'5'} fontWeight={"bold"} mt={"20px"}>Title</Typography>
        <TextField label="Title" variant='filled'
           onChange={(event)=>{
            setTitle(event.target.value)
           }}
        ></TextField>

        <Typography variant={'5'} fontWeight={"bold"} mt={"20px"}>Subject</Typography>
        <TextField label="Subject" variant='filled'
        onChange={(event)=>{
          setSubject(event.target.value)
        }}></TextField>

        <Typography variant={'5'} fontWeight={"bold"} mt={"20px"}>Description</Typography>
        {/* <TextField></TextField> */}
         <TextField
          label="Description"
          multiline
          rows={4}         
          variant="standard"
          onChange={(event)=>{
            setDesc(event.target.value)
          }}
        />

        
        <Box textAlign={"left"} display={"flex"} alignItems={"center"}> 
           <FormControlLabel control={<Checkbox onChange={(event)=>{
             setStatus(event.target.checked)
           }} />} />
           <Typography>Publish Privately</Typography>
         </Box>
          

         <input type="file" hidden ref={fileRef} onChange={handleFileChange}/> 
         <Typography
          
         >
          Add Picture 
          <AddIcon onClick={addImage}></AddIcon>
         </Typography>


        <Button variant='contained' sx={{marginTop:"20px"}} onClick={addBlogHandler}>Add Blog</Button>
    </Stack>
  )
}

export default CreateBlog
