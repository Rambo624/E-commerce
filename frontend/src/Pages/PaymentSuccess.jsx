import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed

function PaymentSuccess() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-green-50'>
      <div className='bg-white p-8 rounded-lg shadow-md text-center max-w-lg'>
        <h1 className='text-3xl font-semibold text-green-600 mb-4'>Payment Successful!</h1>
        <p className='text-lg text-gray-700 mb-6'>
          Thank you for your payment. Your transaction has been processed successfully.
        </p>
        <div className='flex justify-center'>
          <img
            src='https://img.icons8.com/ios/100/000000/checkmark.png' // Add a checkmark or success icon
            alt='Success Icon'
            className='mb-6'
          />
        </div>
        <Link
          to='/'
          className='bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 mr-4'
        >
          Go to Home
        </Link>
        <Link
          to='/orders'
          className='bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300'
        >
          View Orders
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
