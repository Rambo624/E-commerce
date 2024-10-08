import React from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { sellerlogout } from '../../utils/sellerSlice'
function AdminHome() {
  const dispatch=useDispatch()
const navigate=useNavigate()
    async function handlelogout(){
        axiosInstance({method:"POST", url:"/admin/logout"})
        dispatch(sellerlogout())
        navigate("/sellerlogin")
      }

  return (
    <div>
      <div>
        <h1>Welcome</h1>
      </div>
    </div>
  )
}

export default AdminHome