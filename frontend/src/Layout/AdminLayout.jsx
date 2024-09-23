import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

function AdminLayout() {
  return (
    <div>
        <div>
            <Header/>
        </div>
        <div className='bg-gray-200 flex'>
            
            <div className='w-2/12 bg-red-200 '>
            <ul>
          
          <div className="collapse collapse-arrow  ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">Products</div>
            <div className="collapse-content">
              <p>List Products</p>
              <p>List Categories</p>
              <p>List Sub-Categories</p>
            </div>
          </div>
          <div className="collapse collapse-arrow  ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          </ul>
          
            </div>
            <div className='ml-2 bg-green-200 w-10/12' >
                Main
                <Footer/>
            </div>
          
        </div >
        
    </div>
  )
}

export default AdminLayout