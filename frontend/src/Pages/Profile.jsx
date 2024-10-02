import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import { useRef } from 'react';
import { logout } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
function Profile() {
const dispatch=useDispatch()
  const name=useRef()
  const mail=useRef()
  const profile=useRef()

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
const [successmsg,setSuccessmsg]=useState("")



  async function handleLogout() {
    await axiosInstance({ method: "POST", url: "/logout" });
    dispatch(logout())
    navigate("/login");
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

async function handleSubmit(e){
e.preventDefault()
console.log("hello")
 const formData = new FormData();
        formData.append('username', name.current.value);
        formData.append('email', mail.current.value);
    
        
        if (profile.current.files[0]) {
            formData.append('profilepic', profile.current.files[0]);
        }

try {
  
const response=await axiosInstance({method:"PUT",url:"/edit",data:formData})
console.log(response)
setSuccessmsg("Saved Successfully")
setInterval(() => {
  setSuccessmsg("")
}, 5000);


} catch (error) {
  console.log(error)
}

}



  if (!userDetails) return <div className="skeleton h-32 w-32 min-h-screen"></div>

  const { username, email, profilepic,_id } = userDetails;

  return (
    <div className='md:mx-20 min-h-screen mt-6 flex'>
      {/* Sidebar */}
      <div className='md:w-3/12 w-5/12 border-r border-gray-200 pr-6'>
        {/* Hello User Section */}
        <div className='flex items-center border-b border-gray-200 pb-4 mb-6'>
          <figure className='mr-4'>
            <img 
              src={profilepic || "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"} 
              alt="Profile" 
              className='md:w-16 md:h-16    rounded-full'
            />
          </figure>
          <div>
            <span className='text-gray-500 text-sm md:text-base'>Hello,</span>
            <h1 className='font-bold md:text-lg text-sm'>{username}</h1>
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
          <Link to={"/orders"} className='block  md:text-base text-xs py-2 px-4 hover:bg-gray-200 rounded'>My Orders</Link>
          <Link to={"/account-settings"} className='block  md:text-base text-xs py-2 px-4 hover:bg-gray-200 rounded'>Account Settings</Link>
          <Link to={`/address/${_id}`} className='block  md:text-base text-xs py-2 px-4 hover:bg-gray-200 rounded'>Manage addresses</Link>
          <Link to={"/profile-info"} className='block  md:text-base text-xs py-2 px-4 hover:bg-gray-200 rounded'>Change Password</Link>
        </div>
      </div>

      {/* Main Profile Info */}
      <div className='md:w-9/12 w-7/12 md:ml-6'>
        <div className='px-5'>
          <h1 className='md:text-2xl font-semibold mb-4 text-lg'>Personal Info</h1>
          <form  className='space-y-4'>
       

            <div>
              <label className='font-bold md:text-base text-xs' htmlFor="">Name</label><br />
              <input ref={name}  className='py-2 border md:text-base text-xs border-gray-300 rounded w-full'  type="text" defaultValue={username} /><br />
              <label className='font-bold md:text-base text-xs' htmlFor="email">Email Address</label><br />
              <input 
              ref={mail}
                className='py-2 border border-gray-300 rounded w-full md:text-base text-xs' 
                type="email" 
                name="email" 
                defaultValue={email}  /><br/>
                <label className='font-bold md:text-base text-xs' htmlFor="">Profile Picture</label><br />
                <input className='md:text-base text-xs' ref={profile} type="file" />
            </div>

            <button 
              onClick={handleSubmit}
              className='mt-4 md:text-base text-xs px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Save Changes
            </button>
            <h1 className='text-green-500'>{successmsg}</h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
