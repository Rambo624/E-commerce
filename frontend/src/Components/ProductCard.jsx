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
        <div className="card card-compact bg-base-100 w-60  shadow-xl mb-3 border border-black overflow-hidden">
  <figure>
    <img className='p-2 w-32 h-40'
      src={image}
      alt="Shoes" />
  </figure>
  <div className="card-body bg-gray-300 ">
    <h2 className="card-title">{title}</h2>
    <p>{desc}</p>
    <div className="card-actions justify-end">
        <p className='font-bold text-lg'>{price}</p>
        {isSeller && <button onClick={handleDelete}  className='p-2 bg-red-700 text-white rounded-lg'>Delete</button>}
        {isSeller?<button onClick={handleEdit} className='p-2 bg-blue-500  text-white rounded-lg'>Edit</button>: <button onClick={handleBuyButton} className="btn btn-primary">Buy Now</button>}
   
    </div>
  </div>
</div>
    </div>
    
  )
}

export default ProductCard