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

    axios.post("http://localhost:3000/signup",userData)
    navigate("/")
    
} catch (error) {
    console.log(error)
}

}


  return (
    <div className='m-5'>
        <form onSubmit={handleSignup}>
            <label htmlFor="">Username</label><br />
            <input ref={name} className='border border-black' type="text" /><br />
            <label htmlFor="">Email</label><br />
            <input ref={email} className='border border-black' type="text" /><br />
            <label htmlFor="">Password</label><br />
            <input ref={password} className='border border-black' type="text" /><br />

            <button className='border border-black' >Submit</button>
            <p>Already a User?<Link to={"/"}>Login</Link></p>
        </form>
    </div>
  )
}

export default Signup