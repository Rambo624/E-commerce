import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa"
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa'
import { FaShop } from "react-icons/fa6"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import useProducts from '../hooks/useProducts';



function Header() {
 
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {products,loading,error}=useProducts()
  const user = useSelector((store) => store.user)
  const [searchText,setSearchText]=useState(null)
  let size= user?.user?.cart?.products?.length || ""
const [dropdown, setdropdown]=useState(false)
  let userLogin = user.isUserLogged
  let username = null
  let profilepic
  let id
  if (user.user) {
    username = user.user.username
    profilepic=user.user.profilepic
    id=user.user._id
  }

  const [ishover, setIsHover] = useState(false)

function handleMouseEnter(){
  setIsHover(true)
  setdropdown(true)
}
function handleMouseLeave(){
  setIsHover(false)
  setdropdown(false)
}

function handleLogout(){
  axios.post("http://localhost:3000/logout",{},{ withCredentials: true })
dispatch(logout())
  navigate("/login")
}

async function handleSearchBar(e){
setSearchText(e.target.value)
}

async function handleSearch(){
  try {
    if(!searchText.trim()) return null
  console.log(products)
  const results = products.filter((product) => product.title.toLowerCase().includes(searchText.toLowerCase()));
  navigate("/results",{state:{results}})
console.log(results)
  } catch (error) {
    console.log(error)
  }

  }




  return (
    <div className=' py-4 flex justify-between bg-white sticky top-0 z-50 shadow-xl'>
      <div className='w-3/12'>
        <Link to={"/"}><img src={import.meta.env.VITE_LOGO} alt="" /></Link>
      </div>

      <div className='w-5/12 flex'>
      {userLogin && ( 
        <>
        <input onChange={(e)=>handleSearchBar(e)} className='p-3 w-full rounded-bl-xl rounded-tl-xl bg-gray-200' type="text" placeholder='Search for Products,Brands etc...' />
        <button onClick={handleSearch} className=' p-3  bg-gray-200 border border-black rounded-tr-xl rounded-br-xl'><FaSearch/></button> </>)}
       
      </div>

      <div className='w-4/12 px-3 flex gap-11 justify-end'>
        <div className=''>
          {userLogin ?
            <button onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className=' relative hover:bg-blue-500 hover:text-white rounded-lg p-3 flex items-center bg-gray-100'><FaRegUser className='mr-2' /> {username}{ishover ? <FaChevronDown className='ml-2' /> : <FaChevronUp className='ml-2' />} </button>
            : <Link to={"/login"}><button onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className=' hover:bg-blue-500 hover:text-white rounded-lg p-3 flex items-center bg-gray-100'><FaRegUser className='mr-2' /> Login{ishover ? <FaChevronDown className='ml-2' /> : <FaChevronUp className='ml-2' />} </button></Link>}
        
        {userLogin && dropdown && <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className=' absolute shadow-xl rounded-lg bg-white '>
         
           <ul className=' '>
            <li className=' hover:bg-gray-200 p-3 px-14 ' onClick={handleLogout} >Log Out</li>
            <li className=' hover:bg-gray-200 p-3 px-14 '>Log Out</li>
            <li className=' hover:bg-gray-200 p-3 px-14 '>Log Out</li>
            <li className=' hover:bg-gray-200 p-3 px-14 '>Log Out</li>
<li>{searchText}</li>
           </ul>
          </div>}  

        </div>

        {userLogin ? <Link to={`/cart/${id}`}><button className='flex items-center gap-3 mt-3'><FaShoppingCart  />Cart {size}</button></Link> :<Link to={"/sellersignup"}><button className='flex items-center gap-3 mt-3'><FaShop />Become a Seller</button></Link> }
  <Link to={"/profile"}>{userLogin && <img className='w-8 h-7 mt-3' src={profilepic} alt="" />}</Link>
      </div>
    </div>
  )
}

export default Header