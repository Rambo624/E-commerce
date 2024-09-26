import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'

function UserList() {
const [users,setUsers]=useState([])


async function getUsers(){
    const response= await axiosInstance({method:"GET",url:"/admin/getusers"})
    console.log(response.data.data)
    setUsers(response.data.data)
}

useEffect(()=>{
getUsers()
},[])

function handleBlock(){
    
}

  return (
    <div className=''>
        <div>
            <h1 className='font-medium text-xl ml-8 mt-6'>USER LIST</h1>
        </div>
        <div className='border p-5 mt-8 mx-5'>
            {users.map((user)=>(<div className='flex  justify-between px-6 border shadow-sm mx-5 py-7 mb-6'>
                <h1>{user.username}</h1> 
                <h1>{user.email}</h1>
                <button onClick={handleBlock} className='p-2 bg-red-600 text-white'>Block</button>
            </div>))}
            
          
        </div>
    </div>
  )
}

export default UserList