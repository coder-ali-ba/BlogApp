import { Box, Button, Container } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import LogOut from './LogOut';



function NavbarComp() {
  
  return (
         
      <Container className='w-100 flex justify-between mt-4 bg-gray-100 py-4 ' sx={{color:"black", }} >
        <Box display={"flex"} gap={"5px"}>
          <ImportContactsOutlinedIcon color='light'> </ImportContactsOutlinedIcon>
          <Box component="h4" sx={{color:"black"}}>BlogApp</Box>
        </Box>

        <Box display={"flex"} gap={"10px"}>
          <Link to='/'>Home</Link>         
          <Link to='/userdashboard'>Blogs</Link>   
          <Link to='/createblog'>CreateBlog</Link>
          <Link to='/myblogs'>My Blogs</Link>
          
        </Box>
        
        <Button variant="contained">
           <Link to="/login"  >logIn</Link>
        </Button>
        
      </Container>
      
  )
}

export default NavbarComp
