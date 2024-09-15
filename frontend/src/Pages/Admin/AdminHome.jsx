import React from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
function AdminHome() {
const navigate=useNavigate()
    async function handlelogout(){
        axiosInstance({method:"POST", url:"/admin/logout"})
        navigate("/sellerlogin")
      }

  return (
    <div>AdminHome
        <button onClick={handlelogout} className='p-2 bg-blue-200'>Logout</button>
    </div>
  )
}

export default AdminHome