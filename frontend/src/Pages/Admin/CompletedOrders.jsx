import React, { useState,useEffect } from 'react'
import useOrders from '../../hooks/useOrders';
function CompletedOrders() {

const {orders,loading,error}=useOrders()
const [verifiedOrders, setVerifiedOrders]=useState([])


useEffect(() => {
  if (orders && orders.length > 0) {
    setVerifiedOrders(orders.filter((order) => order.status === 'order verified'));
  }
}, [orders]);
let serialNumber = 1;
console.log(verifiedOrders)
  return (
    <div>
      <div className="mx-10 mt-10">
        <div className="border py-6">
          <h1 className="font-bold text-2xl">Completed Orders</h1>
        </div>
        <div className="border mt-10 py-5">
          <div className="overflow-x-auto">
            <table className="table">
              {/* Table Head */}
              <thead>
                <tr className='border border-black'>
                  <th>SI No</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>User</th>
              
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {verifiedOrders.map((order)=>
                order.products.map((product)=> (<tr  className="bg-base-200 border border-black">
                  {/* Serial Number */}
                  <th>{serialNumber++}</th>
                  {/* Product Image */}
                  <td>
                    <img className="w-16" src={product.product.thumbnail} alt="" />
                  </td>
                  {/* Product Title */}
                  <td>{product.product.title}</td>
                  {/* Product Quantity */}
                  <td>{product.stock}</td>
                  {/* Product Price */}
                  <td>{product.product.price}</td>
                  {/* User Information */}
                  <td>{order.user.username}</td>
                  {/* Verify and Reject Buttons */}
                 
                  
                </tr>))
                 )}
                    
                  
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedOrders