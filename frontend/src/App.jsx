import React from 'react'
import Login from "./Pages/Login"
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>

<Route path='/' element={<Login/>}></Route>
<Route path='/signup' element={<Signup/>}></Route>
<Route path='/home' element={<Home/>}></Route>
<Route path='/profile' element={<Profile/>}></Route>


      </Routes>
      
      
      </BrowserRouter>
    
    </div>
  )
}

export default App