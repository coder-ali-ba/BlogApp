import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoutes() {
    const UID =Boolean(localStorage.getItem("user"))
   
    
  return (      
            UID ?  (<Outlet />) : (<Navigate to='/' />)       
  )
}

export default PrivateRoutes
