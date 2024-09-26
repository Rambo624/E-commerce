import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  async function handleLogout() {
    await axiosInstance({ method: "POST", url: "/logout" });
    navigate("/");
  }

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axiosInstance({ method: "GET", url: "/profile" });
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
    fetchProfile();
  }, []);

  if (!userDetails) return <h1>Loading....</h1>;

  const { username, email, profilepic } = userDetails;

  return (
    <div className='mx-20 min-h-screen mt-6 flex'>
      {/* Sidebar */}
      <div className='w-3/12 border-r border-gray-200 pr-6'>
        {/* Hello User Section */}
        <div className='flex items-center border-b border-gray-200 pb-4 mb-6'>
          <figure className='mr-4'>
            <img 
              src={profilepic || "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"} 
              alt="Profile" 
              className='w-16 h-16 rounded-full'
            />
          </figure>
          <div>
            <span className='text-gray-500'>Hello,</span>
            <h1 className='font-bold text-lg'>{username}</h1>
            <button 
              onClick={handleLogout} 
              className='mt-2 text-red-500 hover:underline'
            >
              Logout
            </button>
          </div>
        </div>
        {/* Sidebar Links */}
        <div>
          <Link to={"/orders"} className='block py-2 px-4 hover:bg-gray-200 rounded'>My Orders</Link>
          <Link to={"/account-settings"} className='block py-2 px-4 hover:bg-gray-200 rounded'>Account Settings</Link>
          <Link to={"/profile-info"} className='block py-2 px-4 hover:bg-gray-200 rounded'>Manage addresses</Link>
          <Link to={"/profile-info"} className='block py-2 px-4 hover:bg-gray-200 rounded'>Change Password</Link>
        </div>
      </div>

      {/* Main Profile Info */}
      <div className='w-9/12 ml-6'>
        <div className='px-5'>
          <h1 className='text-2xl font-semibold mb-4'>Personal Info</h1>
          <form className='space-y-4'>
            <div>
              <label className='font-bold' htmlFor="gender">Gender</label><br />
              <label><input type="radio" name="gender" value="male" /> Male</label>
              <label className='ml-5'><input type="radio" name="gender" value="female" /> Female</label>
            </div>

            <div>
              <label className='font-bold' htmlFor="email">Email Address</label><br />
              <input 
                className='py-2 border border-gray-300 rounded w-full' 
                type="email" 
                name="email" 
                defaultValue={email} 
                readOnly 
              />
            </div>

            <button 
              type="button" 
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
