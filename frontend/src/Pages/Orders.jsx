import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';

function Orders() {
  const [order, setOrder] = useState([]);

  // Fetch orders
  async function getOrders() {
    const response = await axiosInstance({
      method: 'GET',
      url: '/order/getorder',
    });
    console.log(response.data.data);
    setOrder(response.data.data);
  }

  useEffect(() => {
    getOrders();
  }, []);

if(order.length==0) return (<div className='w-full m-52 ml-[30%]'><h1 className='min-h-screen text-xl md:text-5xl font-bold'>You have no Orders<Link to={"/"}><p className='text-lg  mt-7 text-blue-400'>Go to Home</p></Link></h1>

</div>)

  return (
    <div className="container min-h-screen text-center">
      {order.map((o) => (
        <div key={o._id} className="border m-2 md:m-10 p-6 shadow-md">
          <h2 className="font-bold md:text-lg text-sm mb-4">Order ID: {o._id}</h2>
          <p className="mb-4 md:text-base text-xs text-orange-400">Status: {o.status}</p>
          
          {/* Mapping through products in the order */}
          <div className='space-y-6'>
            {o.products.map((item, index) => (
              <div key={item.product._id} className="flex items-center justify-between gap-10 border-b pb-4">
                <img src={item.product.thumbnail} alt={item.product.title} className="md:w-16 md:h-16 w-12 h-10 object-cover" />
                <div className='flex-grow'>
                  <p className="font-medium md:text-base text-xs">{item.product.title}</p>
                  <p className="text-gray-500 md:text-base text-xs">{item.product.price} Rs</p>
                </div>
                <Link to={`/addreview/${item.product._id}`} className="text-blue-500 hover:underline md:text-base text-xs">Rate and Review</Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
