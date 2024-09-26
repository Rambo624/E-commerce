import React from 'react'

function CategoryCard({image,name}) {
  return (
    <div>
       <div  className='shadow-lg inline-block p-2 relative '>
        <figure>
<img className='w-32 h-28' src={image} alt="" />
        </figure>
        <p className='text-center '>{name}</p>
    </div>
  
    </div>
   
   
  )
}

export default CategoryCard