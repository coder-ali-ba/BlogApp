import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function LogOut() {
    localStorage.clear("user")
    const navigate = useNavigate()
    const out = () => {
      navigate("/")
    }

    useEffect(()=>{
      out()  } , [])

  return (
    <div>
      <h1>Log Out</h1>
    </div>
  )
}

export default LogOut
