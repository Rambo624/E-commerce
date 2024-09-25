import React from 'react'
import useProducts from '../../hooks/useProducts';
import ProductCategory from '../../Components/ProductCategory';
function SellerProductPage() {
    const { products, loading, error } = useProducts();





    if(loading) return <h1>Loading...</h1>
  return (
    <div className=' container'>
        <div className=''>
        <ProductCategory isSeller={true} Title={"All Products"} products={products}/>
        </div>
        
    </div>
  )
}

export default SellerProductPage