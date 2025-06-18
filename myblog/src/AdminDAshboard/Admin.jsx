import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import UserAccount from '../components/UserAccount';



function Admin() {
  const [getForAdmin, setGetForAdmin]= useState([])
  const [profilePicture , setProfilePicture] = useState("")

  const getblogs = async() => {
    
    let allBlogArray =[]
    const querySnapshot = await getDocs(collection(db, "bolgs"));
    querySnapshot.forEach((blog) => {
      allBlogArray.push(blog.data())     
    });
    setGetForAdmin(allBlogArray)
  }
  useEffect(()=>{
    getblogs()
  }, [])
 



  const getAdmin = async() => {
  const responses = query(collection(db, "Users"), where("userType", "==", "admin"));
  const res =  await getDocs(responses)
  const picLink = res.docs[0].data()
  
  setProfilePicture(picLink)
  
  }
  useEffect(()=>{
    getAdmin()
  }, [])
  


const[allUser, setAllUser]= useState([])

const getAllUsers = async() => {
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





  return (
    <Stack>
        <Stack bgcolor={"gray"}  flexDirection={"row"} justifyContent={"space-between"} mx={"10%"} mt={"10px"} borderRadius={"10px"} px={"5px"} py={"5px"} alignItems={"center"}>
           <Stack flexDirection={"row"} alignItems={"center"} gap={"10px"}>
              <img style={{width:"60px" , height:"60px", borderRadius:"50%"}} src={profilePicture.profilePic} alt="" />
              <Typography variant='h4' color='white'>
                {profilePicture.name}
              </Typography>
           </Stack>
           <Stack gap={"40px"} flexDirection={"row"}>
             <Link to="/createblog"><AddIcon fontSize='large' sx={{color:"white"}}></AddIcon>Create Blog</ Link>
             <NotificationsIcon sx={{color:"white"}} fontSize='large'></NotificationsIcon>
             {/* <AccountCircleIcon sx={{color:"white"}} fontSize='large'>Follow</AccountCircleIcon> */}
           </Stack>
        </Stack>

        <Stack flexDirection={"row"} border={"2px solid green"} borderRadius={"15px"} mt={"40px"} mx={"10%"}>

          <Box  sx={{borderTopLeftRadius:"15px", borderBottomLeftRadius:"15px"}} width={"25%"} paddingBottom={"20px"} >
            <Typography width={"100%"} textAlign={"center"} variant='h6'> All Users</Typography>
            {allUser.length == 0 ? (<CircularProgress  color='Blue'></CircularProgress>) : (
              allUser.map((user , index)=>(
                <Stack key={index} flexDirection={"row"} alignItems={"center"} mt={"10px"} ml={"10px"}>          
                  <img style={{width:"50px", height:"50px", borderRadius:"50%"}} src={user.profilePic} alt="" />
                  {/* <Typography>{user.name}</Typography> */}
                  <Link to="/useraccount" state={{ userId: user.userPassword }}>{user.name}</Link>
                  
                </Stack>
              ))
            )
            }
          </Box>


          <Box px={"20px"}  paddingBottom={"20px"}  >
          {getForAdmin.length == 0 ?
           (<CircularProgress  color='Blue'></CircularProgress>) :
            ( getForAdmin.map((blog , index)=>(
              <Stack component={Link} to="/singleblog" state={{blogId : blog.createdAt}} flexDirection={"row"} gap={"10px"} key={index} mt={"20px"} width={"100%"} bgcolor={"lightGray"} padding={"10px"} borderRadius={"10px"}>
                <img src={blog.imageLink} className='w-50 rounded-lg'  alt="" />
                <Box>
                  <Typography variant='h4'>{blog.title}</Typography>
                  <Typography variant='h6'>{blog.subject}</Typography>
                  <Typography variant='p'>{blog.description}</Typography>
                </Box>
              </Stack> 
              ))
            )
          }
          </Box>
        </Stack>
   </Stack>
  )
}

export default Admin
