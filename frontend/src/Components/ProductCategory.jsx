import React from 'react'
import ProductCard from './ProductCard'

function ProductCategory({Title,products}) {
  return (
    <div className='m-4  shadow-grey-200 shadow-lg'>
        <h1 className='font-bold text-2xl mb-3'>{Title}</h1>
        <div className='flex justify-around'>
            {products.map((product)=>(<ProductCard image={product.thumbnail} title={product.title} desc={product.desc} price={product.price}/>))}
        
       
        </div>
       
    </div>
  )
}

export default ProductCategory