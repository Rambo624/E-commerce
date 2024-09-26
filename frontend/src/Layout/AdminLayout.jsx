import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'
function AdminLayout() {
  return (
    <div>
        <div>
            <Header/>
        </div>
        <div className=' flex'>
            
            <div className='w-2/12 border '>
            <ul>
          
          <div className="collapse collapse-arrow  ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">Users</div>
            <div className="collapse-content">
              <Link to={"/admin/users"}><p>List users</p></Link>
             
            </div>
          </div>
          <div className="collapse collapse-arrow  ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">Sellers</div>
            <div className="collapse-content">
             <Link to={"/admin/sellers"}><p>List sellers</p></Link> 
            </div>
          </div>
          <div className="collapse collapse-arrow  ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">Orders</div>
            <div className="collapse-content">
             <Link to={"/admin/pendingorders"}><p>Pending Orders</p></Link> 
             <Link to={"/admin/completedorders"}><p>Verified Orders</p></Link> 
            </div>
          </div>
          </ul>
          
            </div>
            <div className='w-10/12 '>
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

export default AdminLayout