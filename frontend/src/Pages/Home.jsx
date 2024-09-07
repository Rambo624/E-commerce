import React, { useEffect, useState } from 'react'
import Carousal from '../Components/Carousal'
import CategoryBar from '../Components/CategoryBar'
import ProductCategory from '../Components/ProductCategory'
import axiosInstance from '../utils/axiosInstance'

function Home() {

const [products,setProducts]=useState(null)
const [electronics,setElectronics]=useState(null)
const [appliances,setAppliances]=useState(null)
async function getProducts(){

  const response= await axiosInstance({method:"GET", url:"/product/getproducts"})
  console.log(response.data)
  setProducts(response.data)
 
 

}

useEffect(()=>{
getProducts()
},[])

useEffect(() => {
  if (products) {
    const electronicsProduct = products.filter(
      (product) => product.category.name === 'Electronics'
    );
    setElectronics(electronicsProduct);
    console.log(electronics)
  }
}, [products]);

useEffect(() => {
  if (products) {
    const ApplianceProduct = products.filter(
      (product) => product.category.name === 'Appliances'
    );
    setAppliances(ApplianceProduct);
    console.log(electronics)
  }
}, [products]);

if (!electronics && !appliances) return <h1>Loading....</h1>;



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