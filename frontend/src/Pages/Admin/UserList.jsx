import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

function UserList() {
  const [users, setUsers] = useState([]);

  // Fetch all users from the backend
  async function getUsers() {
    try {
      const response = await axiosInstance({ method: 'GET', url: '/admin/getusers' });
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  // Handle blocking or unblocking a user
  async function handleBlock(id) {
    try {
      const response = await axiosInstance({ method: 'PUT', url: `/admin/block/${id}` });
      const updatedUser = response.data.user; // Assuming `response.data.user` contains the updated user object
      console.log(updatedUser);

      // Update the specific user's isBlocked state in the users array
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? { ...user, isBlocked: updatedUser.isBlocked } : user
        )
      );
    } catch (error) {
      console.error('Error blocking/unblocking user:', error);
    }
  }

  if (!users.length) return <h1>Loading...</h1>;

  return (
    <div className=''>
      <div>
        <h1 className='font-medium text-xl ml-8 mt-6'>USER LIST</h1>
      </div>
      <div className='border p-5 mt-8 mx-5'>
        {users.map((user) => (
          <div key={user._id} className='flex justify-between px-6 border shadow-sm mx-5 py-7 mb-6'>
            <h1>{user.username}</h1>
            <h1>{user.email}</h1>
            <button
              onClick={() => handleBlock(user._id)}
              className={`p-2 ${user.isBlocked ? 'bg-green-600' : 'bg-red-600'} text-white`}
            >
              {user.isBlocked ? 'Unblock' : 'Block'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
