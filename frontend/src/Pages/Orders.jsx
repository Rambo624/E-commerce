import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { Link } from 'react-router-dom'
function Orders() {
const [order,setOrder]=useState([])
async function getOrders(){
    const response= await axiosInstance({method:"GET",url:"/order/getorder"})
    console.log(response.data.data)
    setOrder(response.data.data)
}

useEffect(()=>{
getOrders()
},[])

return (
    <div className="container min-h-screen text-center">
      {order.map((o) => (
        <div key={o._id} className="border flex m-24 gap-48 py-5 shadow-md">
         
          <div className='flex'>
           
            {o.products.map((item) => (
              <div key={item.product._id} className="flex gap-44 items-center">
                <img src={item.product.thumbnail} alt={item.product.title} className="w-16" />
                <div className='flex gap-28'>
                  <p>{item.product.title}</p>
                  <p>{item.product.price} Rs</p>
                </div>
                <p className='text-orange-400'>{o.status}</p>
                <Link to={`/addreview/${item.product._id}`}><p className=' text-blue-500'>Rate and Review</p></Link>
              </div>
              
            ))}
          </div>
         
        </div>
      ))}
    </div>
  );
}

export default Orders