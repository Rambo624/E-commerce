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
            
            <div className='w-2/12 border  h-screen fixed overflow-y-scroll'>
            <ul>
          
<div className="collapse collapse-arrow  ">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-xl font-medium">Products</div>
  <div className="collapse-content">
    <Link to={"/seller/sellerProducts"}><p>List Products</p></Link>
    <p>List Categories</p>
    <p>List Sub-Categories</p>
  </div>
</div>
<div className="collapse collapse-arrow  ">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-xl font-medium">Add Products</div>
  <div className="collapse-content">
    <Link to={"/seller/addproduct"}><p>Add Products</p></Link>
   <Link to={"/seller/addcategory"}> <p>Add Category</p></Link>
   <Link to={"/seller/addsub"}><p>Add Sub-Category</p></Link> 
  </div>
</div>
</ul>


            </div>
            <div className='w-10/12 ml-64'>
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