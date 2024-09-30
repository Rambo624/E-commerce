import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { useParams } from 'react-router-dom'
import useProducts from '../hooks/useProducts'
import ProductCard from '../Components/ProductCard'
import useSub from '../hooks/useSub'

function Productpage() {
const {id}=useParams()
const { products, loading, error } = useProducts();
const [subProducts, setSubProducts]= useState([])
const {sub}=useSub()
const [subname,setSubName]=useState([])



async function getSub(){
    
    

const filtersub=sub.filter((s)=>(s._id===id))
if(filtersub){
  setSubName(filtersub[0].name)
}

const subProduct=products.filter((s)=>(s.subcategory._id===id))
setSubProducts(subProduct)
}


console.log(products)


useEffect(()=>{
getSub()
},[products,id])


if(loading ) return <div className="flex min-h-screen w-52 flex-col gap-4">
<div className="flex items-center gap-4">
  <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
  <div className="flex flex-col gap-4">
    <div className="skeleton h-4 w-20"></div>
    <div className="skeleton h-4 w-28"></div>
  </div>
</div>
<div className="skeleton h-32 w-full"></div>
</div>

  return (
   
    
    <div className='m-4  shadow-grey-200 shadow-lg'>
    <h1 className='font-bold text-2xl mb-3'>{subname}</h1>
    <div className='flex justify-around'>
        {subProducts.map((product)=>(<ProductCard sub_id={product.subcategory._id} key={product._id} id={product._id} image={product.thumbnail} title={product.title} desc={product.desc} price={product.price}/>))}
    
   
    </div>
   
</div>
  
  )
}

export default Productpage