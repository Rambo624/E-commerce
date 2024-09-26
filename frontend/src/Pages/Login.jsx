import React from 'react'
import { useRef } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from '../utils/userSlice'



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

  const response= await  axiosInstance({method:"POST", url:`/login`,data:userData})
  
   if(response.status===200){
      dispatch(login(response.data))
      console.log(response.data)
navigate("/")
   }

  

} catch (error) {
    console.log(error)
}finally{
 
}

}


  return (
  
    <div className={`bg-cover h-screen w-screen bg-[url(${import.meta.env.VITE_BG_IMG})]`}>
   
       <div className='m-[10%] ml-[40%] bg-white border border-black inline-block rounded-xl'>
     
        <form  onSubmit={handleLogin}>
          <div className='bg-blue-600  rounded-t-xl p-2'>
       <h1 className='ml-[30%] font-semibold text-white'>User Login</h1>
          </div >
  <div className='p-4'>
  <label className='font-semibold ' htmlFor="">Email</label><br />
            <input ref={email} className='border border-black rounded-lg w-72 p-1' type="text" /><br />
            <label  className='font-semibold' htmlFor="">Password</label><br />
            <input ref={password} className='border border-black rounded-lg w-72 p-1' type="password" /><br />

            <button className='border border-black mt-5 p-1 text-white bg-blue-600 rounded-lg w-72' >Login</button>
         <p>New User?Create an <Link className='text-blue-400' to={"/signup"}>account</Link></p>
  </div>
           
        </form>
    </div>
    </div>
   
  )
}

export default Login