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
    <div className='mx-20 mt-6 flex' >
     <div className='w-3/12'>

     {/* Hello User Section */}
      <div className='flex border border-grey-200 gap-10 bg-red-200'>
        <figure>
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="" />

        </figure>
        <div>
        <span>Hello</span>
        <h1 className='font-bold text-lg'>User</h1>
        </div>
       </div>
        {/* Hello User Section */}

        <div className='bg-red-200'>
          <h1 className='py-2 ml-11 border border-grey-200 mt-8'>My Orders</h1>
          <h1 className='py-2 ml-11'>Account settings</h1>
          <p className='ml-11'>Profile info</p>
          <p className='ml-11'>Profile info</p>
          <p className='ml-11'>Profile info</p>
        </div>

     </div>
     <div className='w-9/12 bg-red-200 ml-6'>
     <div className='px-5'>
     <h1>Personal Info</h1>


     <form action="">
     <label className='font-bold' htmlFor="">Gender</label><br />
     <label ><input type="radio"  />Male</label>
      <label className='ml-5'><input type="radio"  />Female</label><br />

      <label htmlFor="">Email Address</label><br />
      <input className='py-2' type="text" name="email"  />

  

     </form>
     
     </div>
    
     </div>
        
    </div>
  )
}

export default Profile