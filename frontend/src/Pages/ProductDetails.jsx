import React, { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'

function ProductDetails() {

const {id}=useParams()
const [product, setProduct]= useState(null)
async function getProduct(){
  const response = await axiosInstance({method:"GET", url:`/product/getproduct/${id}`})
  console.log(response.data)
  setProduct(response.data)
}

useEffect(() => {
  getProduct()
}, [])

if(!product) return <h1>Loading....</h1>

const {desc,title,price,thumbnail}=product
  return (
    <div className='flex ' >
      <div className='m-10 w-4/12  '>
        <figure className='w-full '>
          <img className='border w-full h-[500px] border-black p-2' src={thumbnail} alt="" />
        
       
        </figure>
        <div className='flex justify-between mt-5'>
         <Link to={"/cart"} ><button className='bg-[#ff9f00] text-white p-4  w-60'>ADD TO CART</button></Link> 
          <button className='ml-5 bg-[#fb641b]   text-white p-4 w-60'>BUY NOW</button>
          </div>
      </div>
      <div className='w-8/12 bg-red-200 m-10 '>
<h1>{title}</h1>
<p>{desc}</p>
<p className='font-bold text-xl'>{price}</p>
      </div>
    </div>
  )
}

export default ProductDetails