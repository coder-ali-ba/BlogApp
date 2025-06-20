import React from 'react'

function LogOut() {
    localStorage.clear("user")
  return (
    <div>
      <h1>Log Out</h1>
    </div>
  )
}

export default LogOut
