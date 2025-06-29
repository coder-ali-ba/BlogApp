import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


function PrivateRoutes() {
    const UID =Boolean(localStorage.getItem("user"))
    const USER = Boolean(localStorage.getItem("type"))
   
  if (UID && USER) {
    return <Navigate to="/admindashboard" replace />;
  }

  if (UID && !USER) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}

export default PrivateRoutes
