import React from 'react'

function ProductCard({title,image,desc,price}) {
  return (
    <div>
        <div className="card card-compact bg-base-100 w-60  shadow-xl mb-3 border border-black overflow-hidden">
  <figure>
    <img className='p-2 w-32 h-40'
      src={image}
      alt="Shoes" />
  </figure>
  <div className="card-body bg-gray-300 ">
    <h2 className="card-title">{title}</h2>
    <p>{desc}</p>
    <div className="card-actions justify-end">
        <p className='font-bold text-lg'>{price}</p>
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default ProductCard