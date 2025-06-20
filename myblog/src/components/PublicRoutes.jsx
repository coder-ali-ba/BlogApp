import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PublicRoutes() {
  const Uid = Boolean(localStorage.getItem("user"))
  return (
    !Uid ? <Outlet /> : <Navigate  to="/"/>
  )
}

export default PublicRoutes
