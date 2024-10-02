import React from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
function SellerSignup() {
 const name=useRef()
 const email=useRef()
 const password=useRef()
const navigate=useNavigate()
async function handleSignup(e){
  e.preventDefault()
console.log("helo")
const sellerData={
  username:name.current.value,
  email:email.current.value,
  password:password.current.value
}

const response=await axiosInstance({url:"/seller/signup",method:"POST",data:sellerData})
console.log(response)
if(response.status===200){
  navigate("/sellerlogin")
}
}

    return (
        <div className={`bg-cover h-screen w-screen bg-[url(${import.meta.env.VITE_BG_IMG})]`}>
            <div className='m-8 mt-16 md:m-[10%] md:ml-[40%] bg-white  border border-black inline-block rounded-xl '>
            <form onSubmit={handleSignup}>
            <div className='bg-blue-600  rounded-t-xl p-2'>
           <h1 className='ml-[30%] font-semibold text-white'>Seller Signup</h1>
              </div >
              <div className='p-4'>
              <label htmlFor="">Username</label><br />
                <input ref={name} className='border w-80 rounded-lg border-black mb-3 py-1' type="text" /><br />
                <label htmlFor="">Email</label><br />
                <input ref={email} className='border w-80 rounded-lg  border-black mb-3 py-1' type="text" /><br />
                <label htmlFor="">Password</label><br />
                <input ref={password} className='border w-80 rounded-lg  border-black mb-3 py-1' type="password" /><br />
    
                <button onClick={handleSignup} className='border border-black mt-4 w-80 p-1 rounded-lg bg-blue-500 text-white' >Submit</button>
                <p>Already a Seller?<Link className='text-blue-500' to={"/sellerlogin"}>Login</Link></p>
              </div>
              
            </form>
        </div>
        </div>
        
      )
}

export default SellerSignup