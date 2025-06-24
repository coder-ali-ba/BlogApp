import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function AdminRoute() {
    const navigate = useNavigate()
    const isAdmin =localStorage.getItem("type")
    const user = localStorage.getItem("user")

    useEffect(()=>{
       if(!user  || !isAdmin ){
          navigate("/")
       } else if(user && isAdmin){
          navigate("/admindashboard")
       }else{
        navigate("/userdashboard")
       }
    } , [])
  return (
    <div>
         {
            isAdmin  ? <Outlet /> :   null
         }
    </div>
  )
}

export default AdminRoute
