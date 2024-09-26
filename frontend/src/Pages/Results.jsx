import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
function Results() {

    const location = useLocation();
    const results = location.state?.results || [];
    console.log(results)

  return (
    <div className='m-32 ml-80 min-h-screen'>
        {results.length>0?results.map((result)=>( <div className=' flex py-5 border border-gray-200 px-3' >
           <figure className='w-2/12 border border-black '>
<img className='h-60'  src={result.thumbnail}alt="" />
           </figure>
           <div className='w-6/12 ml-10 '>
<h1>{result.title}</h1>
<p>{result.desc}</p>
           </div>
           <div className='w-4/12'>
            <h1 className='font-bold text-3xl'>{result.price}</h1>
            <Link to={`/productdetails/${result._id}`}><button className='mt-24 p-2 bg-blue-600 text-white'>Buy Now</button></Link>
           </div>
        </div>)):<h1 className='font-bold text-4xl ml-52'>Search Result Not Found</h1>}
       
    </div>
  )
}

export default Results