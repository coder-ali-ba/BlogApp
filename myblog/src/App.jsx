import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './Auth/Login'
import Signup from './Auth/Signup'

function App() {
  

  return (
    
    <>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </>
  )
}

export default App
