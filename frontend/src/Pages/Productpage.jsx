import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { useParams } from 'react-router-dom'
import useProducts from '../hooks/useProducts'
import ProductCard from '../Components/ProductCard'

function Productpage() {
const {id}=useParams()
const { products, loading, error } = useProducts();
const [subProducts, setSubProducts]= useState([])
const [sub,setSub]=useState([])

async function getSub(){
    const response= await axiosInstance({method:"GET",url:"/sub/getsub"})
const data=response.data.data

const filtersub=data.filter((s)=>(s._id===id))
setSub(filtersub)
const subProduct=products.filter((s)=>(s.subcategory._id===id))
setSubProducts(subProduct)
}


console.log(products)


useEffect(()=>{
getSub()
},[products,id])


if(loading) return <h1>Loading....</h1>

  return (
   
    
    <div className='m-4  shadow-grey-200 shadow-lg'>
    <h1 className='font-bold text-2xl mb-3'>{sub[0].name}</h1>
    <div className='flex justify-around'>
        {subProducts.map((product)=>(<ProductCard sub_id={product.subcategory._id} key={product._id} id={product._id} image={product.thumbnail} title={product.title} desc={product.desc} price={product.price}/>))}
    
   
    </div>
   
</div>
  
  )
}

export default Productpage