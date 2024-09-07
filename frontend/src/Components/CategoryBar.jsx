import React, { useEffect, useState } from 'react'
import axiosInstance from "../utils/axiosInstance"
import CategoryCard from './CategoryCard'




function CategoryBar() {
const [category,setcategory]=useState(null)

  async function getcategory(){
    const response= await axiosInstance({method:"GET",url:"/category/categories"})
 
  
    setcategory( response.data.data)
    
    }

useEffect(()=>{
getcategory()
},[])
if(!category) return <h1>Loading...</h1>

  return (
 <div className='shadow-xl m-4 flex justify-around'>
{category.map((cat)=>( <CategoryCard key={cat.name} image={cat.image} name={cat.name} />))}
 
 </div>
  )
}

export default CategoryBar