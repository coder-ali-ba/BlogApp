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
import PublicRoutes from './components/PublicRoutes'
import PrivateRoutes from './components/PrivateRoutes'
import MyBlogs from './components/MyBlogs'
import LogOut from './components/LogOut'



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
        <Route element={<PublicRoutes/>}>
             <Route path='/login' element={<Login />}></Route>
             <Route path='/signup' element={<Signup />}></Route>
        </Route>

        <Route path='/' element={<MainDashboard />}></Route>

       <Route element={<PrivateRoutes />}>          
           <Route path='/createblog' element={<CreateBlog/>}></Route>
           <Route path='/userdashboard' element={<User />}></Route>
           <Route path='/useraccount' element={<UserAccount />}></Route>
           <Route path='/singleblog' element={<SingleBlog />}></Route>
           <Route path='/myblogs' element={<MyBlogs />}></Route>
       </Route>
       
       <Route path='/admindashboard' element={<Admin />}></Route>
       <Route path='/logout' element={<LogOut />}></Route>
        

         
      </Routes>
    </>
  )
}

export default App
