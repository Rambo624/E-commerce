import React from 'react'

function CategoryCard({image,name}) {
  return (
    <div className='shadow-lg inline-block p-2 '>
        <figure>
<img className='w-32 h-28' src={image} alt="" />
        </figure>
        <p className='text-center '>{name}</p>
    </div>
  )
}

export default CategoryCard