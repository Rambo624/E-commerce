import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'



function Edituser() {
const [user,setuser]=useState(null)
const navigate=useNavigate()
useEffect(()=>{

async function editUserDetails(){
    const response= await axios.get("http://localhost:3000/profile",{ withCredentials: true })
    console.log(response.data)
setuser(response.data)

}

editUserDetails()
},[])

const handleChange = (e) => {
    const { name, value } = e.target;
    setuser((prevUser) => ({ ...prevUser, [name]: value }));
  };

async function handleEdit(){

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (user.profilepic) {
      formData.append('profilepic', profilepic);
    }


    await axios.put("http://localhost:3000/edit",formData,{withCredentials:true})
    navigate("/profile")
}


async function handleFileChange(e){
console.log(e.target.files)
setuser((prevUser)=>({...prevUser,profilepic:e.target.files[0]}))
}




if(!user) return <h1>Loading....</h1>

const {username,profilepic,email}=user

  return (
    <div className='ml-[40%] m-[20%] border-black border inline-block p-5' >
        <label className='font-bold' htmlFor="">Name</label><br />
        <input className='border border-black p-1 rounded-xl' type="text" name='username' value={username} onChange={handleChange} /><br />
        <label  className='font-bold' htmlFor="">E-mail</label><br />
        <input className='border border-black p-1  rounded-xl' type="text" name='email'  value={email} onChange={handleChange} /><br />
        <label  className='font-bold' htmlFor="">Profile Pic</label><br />
        <input type="file" name='profilepic' onChange={handleFileChange} className="file-input w-full max-w-xs" />

        <button onClick={handleEdit} className='p-1 border bg-blue-500 text-white mt-3 rounded-xl'>Save</button>
    </div>
  )
}

export default Edituser