import React, { useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'



function Profile() {
const navigate=useNavigate()
const [userDetails, setUserDetails]=useState(null)
async function handleLogout(){
  axios.post("http://localhost:3000/logout",{},{ withCredentials: true })
navigate("/")
}



useEffect(() => {
  async function fetchProfile() {
    try {
      const response = await axios.get('http://localhost:3000/profile', { withCredentials: true });
   
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
        <img className='w-48' src={profilepic} alt="" />
        <Link to={"/edit"} ><button >Edit User</button></Link><br />
        <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Profile