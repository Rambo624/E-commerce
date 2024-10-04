import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { toast,Bounce } from 'react-toastify'
function Reviews() {
    const {id}=useParams()
   const [product,setProduct]=useState([])
   const [rating, setRating] = useState(0);
   const [reviewTitle, setReviewTitle] = useState('');
   const [comment, setComment] = useState('');
async function getProduct(){
   const response=await axiosInstance({method:"GET",url:`/product/getproduct/${id}`})
   console.log(response.data)
   setProduct(response.data)
}

useEffect(()=>{
getProduct()
},[])


async function handleSubmit(e){
e.preventDefault()
try {
    const response = await axiosInstance({method:"POST",url:`/product/addreview/${id}`,data:{
        product: id,
    
        rating,
        comment,
        title: reviewTitle,
    }})
    toast.success("Review Added Successfully",{position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,})

} catch (error) {
    console.log(error)
}


}

  return (
    <div>
        <div className='container min-h-screen '>
            <div className='flex shadow-md md:text-base text-sm py-4 px-2 justify-between mt-6'>
                <h1>Ratings and Reviews</h1>
                <p className='flex gap-4' >{product.title}   <img className='w-16' src={product.thumbnail} alt="" /></p>
             
            </div>
            <div className='py-8 px-2 border'>
                <h1 className='md:text-base text-sm font-semibold'>Rate This product</h1>
                <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-orange-400"
                value={star}
                onChange={() => setRating(star)}
                checked={rating === star}
              />
            ))}
          </div>
            </div>
            <div className='py-8 px-2'>
                <h1>Review this Product</h1>
                <textarea onChange={(e)=>{setComment(e.target.value)}} className='border mt-6 min-h-44 w-[90%]  md:mx-9' name="description" placeholder='Write your review' id=""></textarea>
                <input onChange={(e)=>{setReviewTitle(e.target.value)}} className='border md:mx-9 w-[90%]' type="text" placeholder='Review Title' />
            </div>
            <button onClick={handleSubmit} className='md:px-8 md:py-4 px-3 py-1 text-white bg-orange-400 ml-2 md:ml-9'>Submit</button>
        </div>
    </div>
  )
}

export default Reviews