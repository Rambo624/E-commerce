import React from 'react'

function CategoryCard({image,name}) {
  return (
    <div>
       <div  className='shadow-lg inline-block p-1 md:p-2 relative '>
        <figure>
<img className='md:w-32 md:h-28 w-10 h-10' src={image} alt="" />
        </figure>
        <p className='text-center text-xs '>{name}</p>
    </div>
  
    </div>
   
   
  )
}

export default CategoryCard