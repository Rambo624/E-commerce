import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';


function PendingOrders() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the API
  async function getOrders() {
    const response = await axiosInstance({
      method: 'GET',
      url: '/admin/getorders',
    });
   // console.log(response.data.data)
    const pendingOrder= response.data.data.filter((order)=>order.status==="verification pending")
    setOrders(pendingOrder);
  }

  useEffect(() => {
    getOrders();
  }, []);

  async function handleVerify(id){
    const response= await axiosInstance({method:"PUT",url:`/admin/verify/${id}`})
//console.log(response)
if(response.data)
setOrders((prevOrder)=>orders.filter((order)=>(order._id!=id)))
  }

  // Counter for serial numbers
  let serialNumber = 1;

  return (
    <div>
      <div className="mx-10 mt-10">
        <div className="border py-6">
          <h1 className="font-bold text-2xl">Pending Orders</h1>
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
                  <th>Verify</th>
                  <th>Reject</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {orders.map((order) =>
                  order.products.map((product) => (
                    <tr key={product._id} className="bg-base-200 border border-black">
                      {/* Serial Number */}
                      <th>{serialNumber++}</th>
                      {/* Product Image */}
                      <td>
                        <img className="w-16" src={product.product.thumbnail} alt={product.product.title} />
                      </td>
                      {/* Product Title */}
                      <td>{product.product.title}</td>
                      {/* Product Quantity */}
                      <td>{product.stock}</td>
                      {/* Product Price */}
                      <td>{product.product.price}</td>
                      {/* User Information */}
                      <td>{order?.user?.username}</td>
                      {/* Verify and Reject Buttons */}
                      <td>
                        <button onClick={()=>handleVerify(order._id)} className="p-2 bg-green-600 text-white rounded-md">Verify</button>
                      </td>
                      <td>
                        <button className="p-2 bg-red-600 text-white rounded-md">Reject</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingOrders;
