import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ProductCard({title,image,desc,price,id,sub_id}) {
const navigate=useNavigate()

function handleBuyButton(event){
  event.stopPropagation();
  navigate(`/productdetails/${id}`)
}

function handlecard(){

  navigate(`/product/${sub_id}`)
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
    <button onClick={handleBuyButton} className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    </div>
    
  )
}

export default ProductCard