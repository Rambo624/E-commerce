import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removecart } from '../utils/userSlice'


function CartPage() {
const dispatch=useDispatch()
  const { id } = useParams()
  const [cart,setCart]=useState([])
  async function getCart() {
    const response = await axiosInstance({ method: "GET", url: `/cart/getcart/${id}` })
   
    setCart(response.data)
  }


  useEffect(() => {
    getCart()

  }, [])


  async function handleRemoveButton(id){
    
const response = await axiosInstance({method:"DELETE",url:`/cart/removecart/${id}`})

dispatch(removecart(id))
getCart()

  }

console.log(cart,"hello")

if(!cart.user) return <h1>Loading...</h1>
  return (
    <div className='m-20 flex'>
      <div className='w-7/12 '>
        <div className=' flex  justify-between border border-gray-200  p-1 py-4 mb-6'>
          <h1>Deliver to: ,{cart.user.username},{cart.user.address[0].pin}</h1>
          <button className='p-1 mr-6 border border-black text-blue-400'>Change</button>
        </div>


        {/*cart Section*/}
        {cart.products.map((p)=>(
            
          <div key={p.product._id} className='py-4 border border-grey-200 px-2 flex '>
            {console.log(p.product._id)}
          <figure>
            <img className='w-36'src={p.product.thumbnail}/>
            <button className=' border border-grey-200 px-3'>-</button>
            <input className=' border border-grey-200 w-10 mx-5' type="number"  value={p.quantity}  />
            <button className=' border border-grey-200 px-3'>+</button>

          </figure>



          <div>
            <div className='ml-32'>
              <h1>{p.product.title}</h1>
              <h1>{p.product.desc}</h1>
              <h1>{p.product.price}</h1>
              <button onClick={()=>handleRemoveButton(p.product._id)} className='p-2 border border-black'>Remove</button>
            </div>

          </div>
        </div>))}
      
      </div>
      <div className='border border-grey-200 w-5/12 bg-red-200 ml-5'>
        <div className=''>
          <h1 className='border border-grey-200 p-2'>Price Details</h1>
          <p>Price</p>
          <p>platform fee</p>
          <p>Delivery charge</p>
          <p className='border border-grey-200 p-2 font-bold text-lg'>Total Amount</p>
          <div className='flex justify-center mt-11'>
          <button className='p-2 bg-green-400 text-white'>Checkout</button>
          </div>
          
        </div>
      </div>

    </div>

  )
}

export default CartPage