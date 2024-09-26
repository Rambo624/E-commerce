import React, { useEffect, useState } from 'react'
import Carousal from '../Components/Carousal'
import CategoryBar from '../Components/CategoryBar'
import ProductCategory from '../Components/ProductCategory'
import axiosInstance from '../utils/axiosInstance'
import useProducts from '../hooks/useProducts'

function Home() {
  const { products, loading, error } = useProducts();

const [electronics,setElectronics]=useState(null)
const [appliances,setAppliances]=useState(null)

useEffect(() => {
  if (products) {
    const electronicsProduct = products.filter(
      (product) => product.category.name === 'Electronics'
    );
    setElectronics(electronicsProduct);
 
  }
}, [products]);

useEffect(() => {
  if (products) {
    const ApplianceProduct = products.filter(
      (product) => product.category.name === 'Appliances'
    );
    setAppliances(ApplianceProduct);
  
  }
}, [products]);

if (loading) return <h1><div className="flex min-h-screen w-52 flex-col gap-4">
<div className="flex items-center gap-4">
  <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
  <div className="flex flex-col gap-4">
    <div className="skeleton h-4 w-20"></div>
    <div className="skeleton h-4 w-28"></div>
  </div>
</div>
<div className="skeleton h-32 w-full"></div>
</div></h1>;
if (error) return <h1>Error:{error.message}</h1>;


  return (
    <div className=''>
    <CategoryBar/>
    <Carousal/>
    
    <ProductCategory Title={"Best of Electronics"} products={electronics}/>
    <ProductCategory Title={"Best of Appliances"} products={appliances}/>
    </div>
  )
}

export default Home