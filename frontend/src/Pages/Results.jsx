import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
function Results() {

    const location = useLocation();
    const results = location.state?.results || [];
    console.log(results)

  return (
    <div className='md:m-32 md:ml-80 min-h-screen'>
        {results.length>0?results.map((result)=>( <div className=' flex  py-5 border border-gray-200 px-3' >
           <figure className='md:w-2/12 w-5/12  '>
<img className=' h-40 '  src={result.thumbnail}alt="" />
           </figure>
           <div className='md:w-6/12 w-5/12 ml-10 '>
<h1 className='md:text-base text-lg font-semibold mb-3 md:mb-0'>{result.title}</h1>
<h1 className='md:text-base text-sm font-semibold md:hidden'>{result.price} Rs</h1>
<Link to={`/productdetails/${result._id}`}><button className='mt-24 p-2 bg-blue-600 md:hidden md:text-base text-xs text-white'>Buy Now</button></Link>
<p className='md:text-base text-xs md:block hidden'>{result.desc}</p>
           </div>
           <div className='md:w-4/12 w-2/12 ml-10'>
            <h1 className=' text-sm md:block hidden font-semibold md:text-3xl'>{result.price}</h1>
            <Link to={`/productdetails/${result._id}`}><button className='mt-24 p-2 bg-blue-600 md:block hidden md:text-base text-xs text-white'>Buy Now</button></Link>
           </div>
        </div>)):<h1 className='font-bold text-lg md:text-4xl ml-52'>Search Result Not Found</h1>}
       
    </div>
  )
}

export default Results