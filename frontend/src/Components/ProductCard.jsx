import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance';

function ProductCard({title,image,desc,price,id,sub_id,isSeller}) {
const navigate=useNavigate()

function handleBuyButton(event){
  event.stopPropagation();
  navigate(`/productdetails/${id}`)
}



function handlecard(){
if(!isSeller){
  navigate(`/product/${sub_id}`)
}
 
}

async function handleDelete(){
  axiosInstance({method:"DELETE",url:`/product/delete/${id}`})
}

async function handleEdit(){
  navigate(`/seller/editproduct/${id}`)
}

  return (
   
    <div onClick={handlecard}>
        <div className="card  card-compact bg-base-100 md:w-60  shadow-xl mb-3 border border-black overflow-hidden">
  <figure>
    <img className='p-2 md:w-32 md:h-40  w-16 h-20'
      src={image}
      alt="Shoes" />
  </figure>
  <div className="card-body w-40 bg-gray-300 ">
    <h2 className="card-title text-xs md:text-lg ">{title}</h2>
   
    <div className="card-actions justify-end">
        <p className='font-bold text-xs md:text-lg'>{price} ₹</p>
        {isSeller && <button onClick={handleDelete}  className='p-2 bg-red-700 text-white rounded-lg'>Delete</button>}
        {isSeller?<button onClick={handleEdit} className='md:p-2 bg-blue-500  text-white rounded-lg'>Edit</button>: <button onClick={handleBuyButton} className="md:p-2 p-1  text-white rounded-lg text-xs bg-blue-600">Buy Now</button>}
   
    </div>
  </div>
</div>
    </div>
    
  )
}

export default ProductCard