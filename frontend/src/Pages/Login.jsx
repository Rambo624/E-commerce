import React from 'react'
import { useRef } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Login() {

const navigate=useNavigate()
const password=useRef()
const email=useRef()

async function handleSignup(e){
e.preventDefault()

const userData={
 
    email:email.current.value,
    password:password.current.value
}

try {
console.log(userData)
  const response= await  axios.post("http://localhost:3000/login",userData,{ withCredentials: true })
  console.log(response)
   if(response.status===200){
navigate("/profile")
   }

  

} catch (error) {
    console.log(error)
}finally{
 email.current.value=""
   password.current.value=""
}

}


  return (
    <div className='m-5'>
        <form onSubmit={handleSignup}>
           
            <label htmlFor="">Email</label><br />
            <input ref={email} className='border border-black' type="text" /><br />
            <label htmlFor="">Password</label><br />
            <input ref={password} className='border border-black' type="text" /><br />

            <button className='border border-black' >Submit</button>
         <p>New User?Create an <Link className='text-blue-400' to={"/signup"}>account</Link></p>
        </form>
    </div>
  )
}

export default Login