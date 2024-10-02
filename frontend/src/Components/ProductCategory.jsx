import React from 'react'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'

function ProductCategory({Title,products,isSeller}) {
  return (
    <div className='m-4 bg-red-200 shadow-grey-200 shadow-lg'>
        <h1 className='font-bold text-lg md:text-2xl mb-3'>{Title}</h1>
        <div className='flex gap-5 overflow-scroll justify-around md:flex-wrap'>
            {products.map((product)=>(<ProductCard isSeller={isSeller} sub_id={product.subcategory._id} key={product._id} id={product._id} image={product.thumbnail} title={product.title} desc={product.desc} price={product.price}/>))}
        
       
        </div>
       
    </div>
  )
}

export default ProductCategory