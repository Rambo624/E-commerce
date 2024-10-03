import React from 'react'
import { useNavigate } from 'react-router-dom'
function CategoryCard({image,name,id}) {
const navigate=useNavigate()
function handleCategory(){
navigate(`/product/${id}`)
}

  return (
    <div>
       <div  className='shadow-lg inline-block p-1 md:p-2 relative '>
        <figure onClick={handleCategory}>
<img className='md:w-32 md:h-28 w-10 h-10' src={image} alt="" />
        </figure>
        <p className='text-center text-xs '>{name}</p>
    </div>
  
    </div>
   
   
  )
}

export default CategoryCard