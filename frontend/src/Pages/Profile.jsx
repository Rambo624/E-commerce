import React, { useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'



function Profile() {
const navigate=useNavigate()
const [userDetails, setUserDetails]=useState(null)
async function handleLogout(){
  
  axiosInstance({method:"POST",url:"/logout"})
navigate("/")
}



useEffect(() => {
  async function fetchProfile() {
    try {

      const response = await axiosInstance({method:"GET",url:"/profile"})
      setUserDetails(response.data)
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  fetchProfile();
}, []);
if(!userDetails) return <h1>Loading....</h1>
const {username,email,profilepic}=userDetails



  return (
    <div>
     
        <h1>{username}</h1>
      
        <h1>{email}</h1>
      
        <Link to={"/edit"} ><button >Edit User</button></Link><br />
        <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Profile