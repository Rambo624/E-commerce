import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { addcart } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';

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
      setProduct(response.data);
      
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }


  async function getReviews() {
const response= await axiosInstance({method:"GET",url:`/product/getreview/${id}`})
console.log(response.data.data)
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
 console.log(user)
    const productData = {
      productId: id,
      quantity: 1
    };
    try {
      if(user.isUserLogged){
        const response = await axiosInstance({ method: "POST", url: "/cart/addtocart", data: productData });
        console.log(response.data)
           dispatch(addcart(response.data.data)); // Assuming response.data contains the added product
           setIncart(true);
      }else{
        seterrorMessage("Log in to add to cart")
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
      <div className='m-10 w-4/12'>
        <figure className='w-full'>
          <img className='border w-full h-[500px] border-black p-2' src={thumbnail} alt={title} />
        </figure>
        <div className='flex justify-between mt-5'>
          {inCart  ? (
            <button onClick={handleCartbutton} className='bg-[#ff9f00] text-white p-4 w-60'>GO TO CART</button>
          ) : (
             <button onClick={handleAddCartbutton} className='bg-[#ff9f00] text-white p-4 w-60'>ADD TO CART</button>
        
            
      
   
          )}
          <button className='ml-5 bg-[#fb641b] text-white p-4 w-60'>BUY NOW</button>
          
         
        </div>
        <div> <p className='text-red-600 text-lg'>{errorMessage}</p></div>
      </div>
      <div className='w-8/12  m-10'>
      <div className=''>
      <h1 className='font-bold text-xl'>{title}</h1>
        <p className='font-medium'>{desc}</p>
        <p className='font-bold text-xl mt-4'>{price} ₹</p>
      </div>
     <div className=''>
     <h1 className='font-medium mb-5 text-2xl shadow-sm py-7 mt-5 '>Ratings and Reviews</h1>
      {review && review.map((r)=>(<div className='border shadow-sm mt-3'>
     
        <h1><p className='font-bold'><p className='rounded-md text-sm text-white p-0.5 bg-green-500 inline-block'>{r?.rating} ⭐</p> {r?.title}</p></h1>
        <p>{r?.comment}</p>
        <p className='text-sm text-gray-400'>{r?.user?.username}</p>
      </div>))}
      
     </div>
        
      </div>
    
    </div>
  );
}

export default ProductDetails;
