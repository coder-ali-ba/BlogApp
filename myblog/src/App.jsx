import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import { Bounce, ToastContainer } from 'react-toastify'
import Admin from './AdminDAshboard/Admin'
import User from './UserDashboard/User'
import CreateBlog from './CreateBlog/CreateBlog'
import MainDashboard from './mainDashboard/MainDashboard'
import UserAccount from './components/UserAccount'
import SingleBlog from './components/SingleBlog'



function App() {


  

  return (
    
    
    <>
        <ToastContainer
           position="top-right"
           autoClose={5000}
           hideProgressBar={false}
           newestOnTop={false}
           closeOnClick={false}
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
           theme="light"
           transition={Bounce}
        />



      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<MainDashboard />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/admindashboard' element={<Admin />}></Route>
        <Route path='/createblog' element={<CreateBlog/>}></Route>
        <Route path='/userdashboard' element={<User />}></Route>
        <Route path='/useraccount' element={<UserAccount />}></Route>
        <Route path='/singleblog' element={<SingleBlog />}></Route>
      </Routes>
    </>
  )
}

export default App
