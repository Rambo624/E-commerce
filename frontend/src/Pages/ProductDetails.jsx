import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { addcart } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast,Bounce } from 'react-toastify';
function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  
  const [product, setProduct] = useState(null);
  const [review,setReview]=useState([])
  const [inCart, setIncart] = useState(false);
const [errorMessage,seterrorMessage]=useState("")
  // Function to fetch product details
  async function getProduct() {
    try {
      const response = await axiosInstance({ method: "GET", url: `/product/getproduct/${id}` });
      console.log(response.data)
      setProduct(response.data);
      
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }


  async function getReviews() {
const response= await axiosInstance({method:"GET",url:`/product/getreview/${id}`})

setReview(response.data.data)
  }
  // Check if product is in cart
  useEffect(() => {
    if (user.user?.cart?.products) {
      const productInCart = user.user.cart.products.some((p) => p.product === id);
      setIncart(productInCart);
    }
  }, [user.user?.cart?.products, id]);

  // Fetch product details on component mount
  useEffect(() => {
    getProduct();
    getReviews()
  }, [id]);

  // Handle adding product to cart
  async function handleAddCartbutton() {

    const productData = {
      productId: id,
      quantity: 1
    };
    try {
      if(user.isUserLogged && product.stock>=productData.quantity){
        const response = await axiosInstance({ method: "POST", url: "/cart/addtocart", data: productData });
        console.log(response.data)
           dispatch(addcart(response.data.data)); // Assuming response.data contains the added product
           setIncart(true);
           toast.success("Product added to Cart Successfully",{position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,})

      }else if(!user.isUserLogged){
        toast.error("Log in to add to cart",{position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,})
       
      }else{
        console.log(product.stock)
        console.log(productData.quantity)
        seterrorMessage("Product Out of Stock")
        setInterval(()=>{
seterrorMessage("")
        },10000)
      }
    
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }

  // Navigate to cart
  function handleCartbutton() {
    navigate(`/cart/${id}`);
  }

  // Loading state
  if (!product) return <div className="flex min-h-screen w-52 flex-col gap-4">
  <div className="flex items-center gap-4">
    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
    <div className="flex flex-col gap-4">
      <div className="skeleton h-4 w-20"></div>
      <div className="skeleton h-4 w-28"></div>
    </div>
  </div>
  <div className="skeleton h-32 w-full"></div>
  </div>

  const { desc, title, price, thumbnail } = product;

  return (
    <div className='flex'>
      <div className='md:m-10 mt-10 ml-2 w-4/12'>
        <figure className='w-full'>
          <img className='border md:w-full md:h-[500px] border-black p-2' src={thumbnail} alt={title} />
        </figure>
        <div className='flex justify-between mt-5'>
          {inCart  ? (
            <button onClick={handleCartbutton} className='bg-[#ff9f00] p-1 md:text-base text-xs text-white md:p-4 md:w-60'>GO TO CART</button>
          ) : (
             <button onClick={handleAddCartbutton} className='bg-[#ff9f00] p-1 md:text-base text-xs text-white md:p-4 md:w-60'>ADD TO CART</button>
        
            
      
   
          )}
          <button className=' bg-[#fb641b] md:text-base ml-2 p-1 md:ml-5 text-white md:p-4 md:w-60 text-xs'>BUY NOW</button>
          
         
        </div>
        <div> <p className='text-red-600 text-lg'>{errorMessage}</p></div>
      </div>
      <div className='w-8/12  mt-10 ml-4  md:m-10'>
      <div className=''>
      <h1 className='font-bold md:text-xl text-sm'>{title}</h1>
        <p className='font-medium text-xs md:text-base'>{desc}</p>
        <p className='font-bold md:text-xl text-xs mt-4'>{price} ₹</p>
      </div>
     <div className=''>
     <h1 className='font-medium mb-5 md:text-2xl shadow-sm md:py-7 mt-5 text-sm'>Ratings and Reviews</h1>
      {review && review.map((r)=>(<div className='border shadow-sm mt-3'>
     
        <h1><p className='font-bold md:text-base text-xs'><p className='rounded-md text-sm text-blue-400 md:text-white md:p-0.5 md:bg-green-500 inline-block'>{r?.rating} ⭐</p> {r?.title}</p></h1>
        <p className='md:text-base text-xs'>{r?.comment}</p>
        <p className='text-sm text-gray-400'>{r?.user?.username}</p>
      </div>))}
      
     </div>
        
      </div>
    
    </div>
  );
}

export default ProductDetails;
