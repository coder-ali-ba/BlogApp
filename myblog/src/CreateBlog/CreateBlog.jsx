import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { addDoc, collection } from "firebase/firestore"; 
import { db } from '../firebase';
import { Bounce, toast } from 'react-toastify';


function CreateBlog() {
  const [title , setTitle] = useState("")
  const [subject , setSubject] = useState('')
  const [desc, setDesc] = useState("")

  const addBlogHandler = async() => {
    const addBlog = {
      title,
      subject,
      description :desc
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
    //  console.log(docRef);

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

        <Button variant='contained' sx={{marginTop:"20px"}} onClick={addBlogHandler}>Add Blog</Button>
    </Stack>
  )
}

export default CreateBlog
