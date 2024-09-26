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

  return (
    <div className="container min-h-screen text-center">
      {order.map((o) => (
        <div key={o._id} className="border m-10 p-6 shadow-md">
          <h2 className="font-bold text-lg mb-4">Order ID: {o._id}</h2>
          <p className="mb-4 text-orange-400">Status: {o.status}</p>
          
          {/* Mapping through products in the order */}
          <div className='space-y-6'>
            {o.products.map((item, index) => (
              <div key={item.product._id} className="flex items-center justify-between gap-10 border-b pb-4">
                <img src={item.product.thumbnail} alt={item.product.title} className="w-16 h-16 object-cover" />
                <div className='flex-grow'>
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-gray-500">{item.product.price} Rs</p>
                </div>
                <Link to={`/addreview/${item.product._id}`} className="text-blue-500 hover:underline">Rate and Review</Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
