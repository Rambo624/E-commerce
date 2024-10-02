import React, { useState, useEffect } from 'react';
import useUser from '../hooks/useUser';
import axiosInstance from '../utils/axiosInstance';

function AddressPage() {
  const { users, loading, error } = useUser();
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    House: '',
    city: '',
    state: '',
    pin: ''
  });

  useEffect(() => {
    if (users && users.address) {
      setAddresses(users.address);
    }
  }, [users]);

  async function handleDelete(id) {
    await axiosInstance.delete(`/deleteaddress/${id}`);
    setAddresses((prevAddresses) => 
      prevAddresses.filter((address) => address._id !== id)
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance({method:"POST",url:"/address",data:newAddress})
     console.log(response)
      setAddresses((prevAddresses) => [...prevAddresses, response.data.user.address.slice(-1)[0]]);
   
      setNewAddress({ House: '', city: '', state: '', pin: '' });
    } catch (error) {
      console.error('Error adding address:', error);
    }
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading addresses.</h1>;

  return (
    <div className='min-h-screen p-4'>
      <h1 className='md:text-2xl font-semibold mb-4 text-lg'>Your Addresses</h1>
      
      {/* List of addresses */}
      <div className='space-y-4'>
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div key={address._id} className='p-4 border rounded shadow'>
              <h2 className='md:text-xl '>{address.House}</h2>
              <p>{`${address.city}, ${address.state} ${address.pin}`}</p>
              <button onClick={() => handleEdit(address._id)} className='p-1 bg-blue-600 md:text-base text-xs text-white rounded-lg mr-5 mt-3'>EDIT</button>
              <button onClick={() => handleDelete(address._id)} className='p-1 mt-3 bg-red-600 md:text-base text-xs text-white rounded-lg'>Remove</button>
            </div>
          ))
        ) : (
          <p>No addresses available.</p>
        )}
      </div>

      {/* Form to add a new address */}
      <form onSubmit={handleSubmit} className='mt-6'>
        <h2 className='md:text-xl text-lg font-semibold mb-4'>Add New Address</h2>
        <div className='grid grid-cols-1 gap-4'>
          <input 
            type='text' 
            placeholder='House' 
            value={newAddress.House} 
            onChange={(e) => setNewAddress({ ...newAddress, House: e.target.value })} 
            className='p-2 border rounded md:text-base text-xs'
            required
          />
          <input 
            type='text' 
            placeholder='City' 
            value={newAddress.city} 
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} 
            className='p-2 border rounded md:text-base text-xs'
            required
          />
          <input 
            type='text' 
            placeholder='State' 
            value={newAddress.state} 
            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} 
            className='p-2 border rounded md:text-base text-xs'
            required
          />
          <input 
            type='number' 
            placeholder='Pin Code' 
            value={newAddress.pin} 
            onChange={(e) => setNewAddress({ ...newAddress, pin: e.target.value })} 
            className='p-2 border rounded md:text-base text-xs'
            required
          />
          <button type='submit' className='px-4 md:text-base text-sm py-2 w-60 bg-blue-500 text-white rounded hover:bg-blue-600'>
            Add Address
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddressPage;
