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
     if(user.data().userType ==="user"){
       allUsers.push(user.data()) 
     }
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
        <Stack bgcolor={"darkGray"}  flexDirection={"row"} justifyContent={"space-between"} mx={"10%"} mt={"10px"} borderRadius={"5px"} px={"5px"} py={"5px"} alignItems={"center"}>
           <Stack flexDirection={"row"} alignItems={"center"} gap={"10px"}>
              <img style={{width:"60px" , height:"60px", borderRadius:"50%"}} src={profilePicture.profilePic} alt="" />
              <Typography variant='h4' color='white'>
               Admin  {profilePicture.name}
              </Typography>
           </Stack>
           <Stack gap={"40px"} flexDirection={"row"}>
             
             <NotificationsIcon sx={{color:"white"}} fontSize='large'></NotificationsIcon>
             {/* <AccountCircleIcon sx={{color:"white"}} fontSize='large'>Follow</AccountCircleIcon> */}
           </Stack>
        </Stack>

        <Stack flexDirection={"row"}  borderRadius={"5px"} mt={"10px"} mx={"10%"} bgcolor={"darkGray"}>

          <Box className=""  sx={{borderTopLeftRadius:"15px", borderBottomLeftRadius:"15px"}} width={"40%"} paddingBottom={"20px"} >
            <Typography width={"100%"} textAlign={"center"} mt={"20px"} color='white' variant='h5'> All Users</Typography>
            {allUser.length == 0 ? (<CircularProgress  color='Blue'></CircularProgress>) : (
              allUser.map((user , index)=>(
                <Stack key={index} flexDirection={"row"} padding={"2px"} borderRadius={"5px"} alignItems={"center"} mt={"10px"} ml={"10px"} bgcolor={"white"}>          
                  <img style={{width:"50px", height:"50px", borderRadius:"50%"}} src={user.profilePic} alt="" />
                  
                  <Link to="/useraccount" state={{ userId: user.userPassword }} sx={{fontSize:"xl"}}> {user.name}</Link>
                  
                </Stack>
              ))
            )
            }
          </Box>


          <Box px={"20px"}  paddingBottom={"20px"} ml={"20px"}>
          {getForAdmin.length == 0 ?
           (<CircularProgress  color='Blue'></CircularProgress>) :
            ( getForAdmin.map((blog , index)=>(
              <Stack component={Link} to="/singleblog" state={{blogId : blog.createdAt}} flexDirection={"row"} gap={"10px"} key={index} mt={"20px"} alignContent={"end"} width={"100%"} bgcolor={"white"} padding={"10px"} borderRadius={"10px"}>
                <img src={blog.imageLink || null} className='w-50 rounded-lg'  alt="" />
                <Box>
                  <Typography variant='h4'><Typography marginBottom={"-40px"}>Title :</Typography> <br />{blog.title}</Typography>
                  <Typography variant='h6'><Typography marginBottom={"-40px"}>Subject :</Typography> <br />{blog.subject}</Typography>
                  <Typography variant='p'><Typography marginBottom={"-30px"}>Description :</Typography> <br />{blog.description}</Typography>
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
