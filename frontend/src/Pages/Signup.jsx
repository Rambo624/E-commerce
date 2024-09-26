import React from 'react'
import { useRef } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Signup() {

const name=useRef()
const password=useRef()
const email=useRef()
const navigate=useNavigate()
function handleSignup(e){
e.preventDefault()

const userData={
    username:name.current.value,
    email:email.current.value,
    password:password.current.value
}

try {

    axios.post("https://e-commerce-1-r5xk.onrender.com/signup",userData)
    navigate("/login")
    
} catch (error) {
    console.log(error)
}

}


  return (
    <div className={`bg-cover h-screen w-screen bg-[url(${import.meta.env.VITE_BG_IMG})]`}>
        <div className='m-[10%] ml-[40%] bg-white  border border-black inline-block rounded-xl '>
        <form onSubmit={handleSignup}>
        <div className='bg-blue-600  rounded-t-xl p-2'>
       <h1 className='ml-[30%] font-semibold text-white'>User Signup</h1>
          </div >
          <div className='p-4'>
          <label htmlFor="">Username</label><br />
            <input ref={name} className='border w-80 rounded-lg border-black mb-3 py-1' type="text" /><br />
            <label htmlFor="">Email</label><br />
            <input ref={email} className='border w-80 rounded-lg  border-black mb-3 py-1' type="text" /><br />
            <label htmlFor="">Password</label><br />
            <input ref={password} className='border w-80 rounded-lg  border-black mb-3 py-1' type="text" /><br />

            <button className='border border-black mt-4 w-80 p-1 rounded-lg bg-blue-500 text-white' >Submit</button>
            <p>Already a User?<Link className='text-blue-500' to={"/login"}>Login</Link></p>
          </div>
          
        </form>
    </div>
    </div>
    
  )
}

export default Signup