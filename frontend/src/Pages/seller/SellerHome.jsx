import React from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
function SellerHome() {
const navigate=useNavigate()
async function handlelogout(){
  axiosInstance({method:"POST", url:"/seller/logout"})
  navigate("/sellerlogin")
}

  return (
    <div>SellerHome
      <button onClick={handlelogout} >Logout</button>
    </div>
  )
}

export default SellerHome