import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'
function SellerLayout() {
  return (
    <div>
       
            <Header/>
        
        <div className=' flex flex-grow '>
            
            <div className='md:w-2/12 w-4/12 border  h-screen fixed overflow-y-scroll'>
            <ul>
          
<div className="collapse collapse-arrow  ">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-sm md:text-xl font-medium">Products</div>
  <div className="collapse-content">
    <Link to={"/seller/sellerProducts"}><p className='md:text-base text-xs'>List Products</p></Link>
    <p className='md:text-base text-xs'>List Categories</p>
    <p className='md:text-base text-xs'>List Sub-Categories</p>
  </div>
</div>
<div className="collapse collapse-arrow  ">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-sm md:text-xl font-medium">Add Products</div>
  <div className="collapse-content">
    <Link to={"/seller/addproduct"}><p className='md:text-base text-xs'>Add Products</p></Link>
   <Link to={"/seller/addcategory"}> <p className='md:text-base text-xs'>Add Category</p></Link>
   <Link to={"/seller/addsub"}><p className='md:text-base text-xs'>Add Sub-Category</p></Link> 
  </div>
</div>
</ul>


            </div>
            <div className='md:w-10/12 w-8/12 ml-32 md:ml-64 overflow-x-hidden'>
            <div className='  h-screen' >
                <Outlet/>
            </div>
            <div>
                <Footer/>
            </div>
            </div>
          
          
        </div >
        
    </div>
  )
}

export default SellerLayout