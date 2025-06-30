import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'


function UserAccount() {
  const [inActive , setInActive] = useState(true)
  const navigate = useNavigate()

   const location =useLocation()
   const userPassword = location.state?.userId

 
   const[allUser, setAllUser]= useState([])
  
  const getAllUsers = async() => {
    setAllUser([])
    let allUsers =[]
    try {
      const users = await getDocs(collection(db , "Users"));
      users.forEach((user)=>{
      // console.log(user.data()); 
      allUsers.push(user.data())  
    })
  
    setAllUser(allUsers)
    
    } catch (error) {
      console.log(error.message);
      
    }  
  }
  
  useEffect(()=>{
    getAllUsers()
  } , [])

const a= allUser.find((user)=>{
    return user.userPassword == userPassword
})


const delAccount = async () => {
  try {
    await deleteDoc(doc(db, "Users", a.userUId)); 
    console.log("Document deleted successfully!");
    navigate("/admindashboard")
  } catch (error) {
    console.error("Error deleting document:", error);    
  }
}

 

const toggleActive = async() => { 
  let currStatus = a.isActive
  try { 
    const response = doc(db , "Users" , a.userUId) 
    await updateDoc(response , {
      isActive : !currStatus
    })

    setInActive(currStatus)
    getAllUsers()
  } catch (error) {
    console.log(error.message);   
  } 
}



 
  return (
  
    <Stack>    
       {!a ? (<CircularProgress  color='Blue'></CircularProgress>) : (
           <Stack className='bg-blue-400 m-auto text-center' padding={"40px"} borderRadius={"10px"} mt={"30px"}>
            <Typography variant='h4' >Account Name : {a.name}</Typography>
            <img style={{borderRadius:"50%", margin:'auto'}}  className='w-75 h-75'  src={a.profilePic || null} alt="#" />
            <Typography>Email Address : {a.emailAddress}</Typography>    
            <Typography>User Type : {a.userType}</Typography>
            
            <Box display={'flex'} flexDirection={"row"} justifyContent={"space-around"}>
              <Button onClick={delAccount} sx={{backgroundColor:"red", mt:"20px"}} variant="contained">Delete Account</Button>
              <Button onClick={toggleActive} sx={{backgroundColor:"Warning", mt:"20px"}} variant="contained">{inActive ? "InActive" : "Active"}</Button>
            </Box>
           </Stack>
       ) }     
    </Stack>
  )
}

export default UserAccount
