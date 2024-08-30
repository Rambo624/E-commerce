import React, { useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
function Profile() {
const navigate=useNavigate()
async function handleLogout(){
  axios.post("http://localhost:3000/logout",{},{ withCredentials: true })
navigate("/")
}



/*
useEffect(()=>{
axios.get("http://localhost:3000/profile/:id")

},[])
*/

  return (
    <div>
        <h1>Name</h1>
        <h1>Email</h1>
        <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Profile