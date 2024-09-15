import React from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../utils/sellerSlice'
function SellerHome() {
  const dispatch=useDispatch()
const navigate=useNavigate()
async function handlelogout(){
  axiosInstance({method:"POST", url:"/seller/logout"})
  dispatch(logout())
  navigate("/sellerlogin")
}

  return (
    <div>SellerHome
      <button onClick={handlelogout} >Logout</button>
    </div>
  )
}

export default SellerHome