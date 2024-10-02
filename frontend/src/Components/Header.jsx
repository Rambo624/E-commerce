import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa"
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa'
import { FaShop } from "react-icons/fa6"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { sellerlogout } from '../utils/sellerSlice';
import { toast, Bounce } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';
import useProducts from '../hooks/useProducts';
import useSub from '../hooks/useSub';
import useCategory from '../hooks/useCategory';
import Darkmode from '../ui/Darkmode';


function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products, loading, error } = useProducts()
  const { sub } = useSub()
  const { Category } = useCategory
  const user = useSelector((store) => store.user)
  const seller = useSelector((store) => store.seller)

  const [searchText, setSearchText] = useState(null)
  let size = user?.user?.cart?.products?.length || ""
  const [dropdown, setdropdown] = useState(false)
  let userLogin = user.isUserLogged || seller.isSellerLogged

  let username = null
  let profilepic
  let id
  if (user.user || seller.seller) {
    username = user.user?.username || seller.seller?.data?.username || seller.seller?.data?.name
    profilepic = user.user?.profilepic || seller.seller?.data?.profilepic
    id = user.user?._id || seller.seller?.data?._id
  }

  const [ishover, setIsHover] = useState(false)




  function handleMouseEnter() {
    setIsHover(true)
    setdropdown(true)
  }
  function handleMouseLeave() {
    setIsHover(false)
    setdropdown(false)
  }

  async function handleLogout() {
    if (user) {
      await axiosInstance({ method: "POST", url: "/logout" })

      dispatch(logout())
      toast.success("Logged Out Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
      navigate("/login")
    }
    axiosInstance({ method: "POST", url: "/seller/logout" })
    dispatch(sellerlogout())
    navigate("/login")

  }

  async function handleSearchBar(e) {
    setSearchText(e.target.value)

  }

  async function handleSearch() {
    try {
      if (!searchText.trim()) return null
      console.log(products)
      const results = products.filter((product) => {
        const productTitle = product.title.toLowerCase();
        const categoryName = product.category.name.toLowerCase();
        const subcategoryName = product.subcategory.name.toLowerCase();


        return (
          productTitle.includes(searchText.toLowerCase()) ||
          categoryName.includes(searchText.toLowerCase()) ||
          subcategoryName.includes(searchText.toLowerCase())
        );
      });




      navigate("/results", { state: { results } })
      console.log(results)
    } catch (error) {
      console.log(error)
    }

  }




  return (
    <div className={`md:py-4 py-3 justify-center items-center flex  bg-white sticky top-0 z-50 shadow-xl`}>
      <div className='md:w-3/12 w-2/12 '>
        <Link to={"/"}><img className='md:w-auto w-20' src={import.meta.env.VITE_LOGO} alt="" /></Link>
      </div>

      <div className='md:w-5/12 w-5/12 flex  md:bg-white '>
        {userLogin && (
          <>
            <input onChange={(e) => handleSearchBar(e)} className='md:p-3 p-2 ml-2 h-6 md:h-auto w-full text-xs md:text-base rounded-bl-sm rounded-tl-sm bg-gray-200' type="text" placeholder='Search for Products,Brands etc...' />
            <button onClick={handleSearch} className=' md:p-3 p-1 h-6 md:h-auto bg-gray-200 border md:border-black  rounded-tr-sm rounded-br-sm'><FaSearch /></button> </>)}

      </div>

      <div className='md:w-4/12 align justify-center items-center  w-5/12 md:px-3 flex md:gap-11  md:bg-white '>
        <div   >
          <Darkmode />
        </div>
        <div className='  '>
          {userLogin ?
            <button onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className=' relative  md:w-auto md:p-3 h-6 md:h-auto md:text-base text-xs py-2  md:hover:bg-blue-500 hover:text-white rounded-lg p-1 flex items-center '><FaRegUser className='mr-2 md:block hidden' /> {username}{ishover ? <FaChevronDown className='ml-2' /> : <FaChevronUp className='ml-2 md:block hidden' />} </button>
            : <Link to={"/login"}><button onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className=' hover:bg-blue-500 hover:text-white rounded-lg md:p-3 p-1 md:text-base text-sm flex items-center mr-2 bg-gray-100'><FaRegUser className='mr-2 md:block hidden' /> Login{ishover ? <FaChevronDown className='ml-2 md:block hidden ' /> : <FaChevronUp className='ml-2 md:block hidden ' />} </button></Link>}

          {userLogin && dropdown && <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className=' absolute shadow-xl rounded-lg bg-white '>

            <ul className=' '>
              <li className=' hover:bg-gray-200 md:p-3  md:px-14 ' onClick={handleLogout} >Log Out</li>


            </ul>
          </div>}

        </div >
<div className='flex justify-center items-center'>
{userLogin ? <Link to={`/cart/${id}`}><button className='flex  text-sm md:text-base md:gap-3 mt-3'><FaShoppingCart className='' /><p className='hidden md:block'>Cart</p><p>{size}</p> </button></Link> : <Link to={"/sellersignup"}><button className='flex justify-center items-center md:text-base text-sm md:gap-3 mt-3'><FaShop />Become a Seller</button></Link>}
<Link to={"/profile"}>{userLogin && <img className='md:w-8 md:h-7 w-6 h-6 mt-3 ' src={profilepic} alt="" />}</Link>
</div>
       
      </div>
    </div>
  )
}

export default Header