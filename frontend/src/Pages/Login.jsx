import React from 'react'
import { useRef } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login,logout } from '../utils/userSlice'



function Login() {
const dispatch=useDispatch()
const navigate=useNavigate()
const password=useRef()
const email=useRef()

async function handleLogin(e){
e.preventDefault()

const userData={
 
    email:email.current.value,
    password:password.current.value
}

try {

  const response= await  axios.post("http://localhost:3000/login",userData,{ withCredentials: true })
  
   if(response.status===200){
      dispatch(login(response.data))
navigate("/profile")
   }

  

} catch (error) {
    console.log(error)
}finally{
 
}

}


  return (
  
    <div className='bg-cover h-screen w-screen bg-[url(https://th.bing.com/th/id/R.ab58913984a664a8032490d026113b31?rik=pO30G9NVzF1h3Q&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fJYf8BYc.jpg&ehk=wH%2fvY9tL%2fM9S4LNHZAy%2fVMFJrCCaiCaXydP3R0BJI70%3d&risl=&pid=ImgRaw&r=0)]'>
   
       <div className='m-[10%] ml-[40%] bg-white  border border-black inline-block rounded-xl'>
     
        <form  onSubmit={handleLogin}>
          <div className='bg-blue-600  rounded-t-xl p-2'>
       <h1 className='ml-[30%] font-semibold text-white'>User Login</h1>
          </div >
  <div className='p-4'>
  <label className='font-semibold ' htmlFor="">Email</label><br />
            <input ref={email} className='border border-black rounded-lg w-72 p-1' type="text" /><br />
            <label  className='font-semibold' htmlFor="">Password</label><br />
            <input ref={password} className='border border-black rounded-lg w-72 p-1' type="text" /><br />

            <button className='border border-black mt-5 p-1 text-white bg-blue-600 rounded-lg w-72' >Login</button>
         <p>New User?Create an <Link className='text-blue-400' to={"/signup"}>account</Link></p>
  </div>
           
        </form>
    </div>
    </div>
   
  )
}

export default Login