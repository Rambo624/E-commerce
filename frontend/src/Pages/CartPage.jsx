import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removecart,clearcart } from '../utils/userSlice'
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom'


function CartPage() {
  const dispatch = useDispatch()
  const [isProcessing, setIsProcessing] = useState(false);

  const { id } = useParams()
  const [message, setMessage] = useState()
  const [cart, setCart] = useState([])
  async function getCart() {
    const response = await axiosInstance({ method: "GET", url: `/cart/getcart/${id}` })
    console.log(response.data,"get cart")
    setCart(response.data)
  }


  useEffect(() => {
    getCart()

  }, [])

  {/*FUNCTIONS*/ }

  async function handleRemoveButton(id) {

    const response = await axiosInstance({ method: "DELETE", url: `/cart/removecart/${id}` })

    dispatch(removecart(id))
    getCart()

  }


  async function makePayment() {
    if (isProcessing) return; // Prevent multiple clicks
    setIsProcessing(true);
    try {
      const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);
      // console.log(cart)

      const session = await axiosInstance({ method: "POST", url: "/cart/payment", data: { products: cart.products } })
      const cartDetails= await axiosInstance({method:"DELETE",url:"/cart/clearcart"})
      dispatch(clearcart())
      setTimeout(()=>{
        getCart()
      },2000)
     

      window.open(session.data.url, '_blank');

     
console.log(response)
    } catch (error) {
      console.log(error)
    } finally {
      setIsProcessing(false); // Re-enable the button if necessary
    }

  }

  async function handleSubtract(cartId, productId, quantity) {
    try {
      quantity--
      const response = await axiosInstance({ method: "PUT", url: "/cart/addquantity", data: { cartId: cartId, productId: productId, quantity: quantity } })
      getCart()
    } catch (error) {
      console.log(error)
    }
  }



  async function handleAddQuantity(cartId, productId, quantity, stock) {
    try {

      quantity++
      if (quantity > stock) {
        setMessage(`Only ${stock} available`)
        setInterval(() => {
          setMessage("")
        }, 5000);
        quantity--
        return null
      }
      if (quantity <= 10) {
        const response = await axiosInstance({ method: "PUT", url: "/cart/addquantity", data: { cartId: cartId, productId: productId, quantity: quantity } })
        getCart()
      }
      else {
        setMessage("Max 10 units in a single order")
        setInterval(() => {
          setMessage("")
        }, 5000);

      }
    } catch (error) {
      console.log(error)
    }
  }


  {/*FUNCTIONS*/ }

  //console.log(cart,"hello")

  if (!cart.user) return <div className='min-h-screen'><h1 className='font-bold text-3xl'>Oops!!No Items in the cart</h1></div>
  return (
    <div className='m-20 flex min-h-screen'>
      <div className='w-7/12 '>
      {cart.products.length>0 &&   <div className=' flex  justify-between border border-gray-200  p-1 py-4 mb-6'>
          <h1>Deliver to: {cart?.user?.username},{cart?.user?.address[0]?.pin}</h1>
          <button className='p-1 mr-6 border border-black text-blue-400'>Change</button>
        </div>}
      


        {/*cart Section*/}

        {cart.products.length == 0 ? <div><h1 className='font-bold text-3xl'>Oops!!No Items in the cart</h1><Link to={"/"}><p className='text-blue-500'>Go to Home Page</p></Link></div> :cart.products.map((p) => (

<div key={p.product._id} className='py-4 border border-grey-200 px-2 flex '>

  <figure>
    <img className='w-36' src={p.product.thumbnail} />
    <button onClick={() => handleSubtract(cart._id, p._id, p.quantity)} className=' border border-grey-200 px-3 mt-2'>-</button>
    <input className=' border border-grey-200 w-10 mx-5 mt-2' type="number" value={p.quantity} />
    <button onClick={() => handleAddQuantity(cart._id, p._id, p.quantity, p.product.stock)} className=' border border-grey-200 px-3 mt-2'>+</button>
    <p className='text-red-600 mt-2'>{message}</p>
  </figure>



  <div>
    <div className='ml-32'>
      <h1>{p.product.title}</h1>
     
      <h1>{p.product.price}</h1>
      <button onClick={() => handleRemoveButton(p.product._id)} className='p-2 border border-black'>Remove</button>
    </div>

  </div>
</div>))}

     

      </div>
      {cart.products.length >0 &&   <div className='border border-grey-200 w-5/12 ml-5'>
        <div className=''>

          <h1 className='border border-grey-200 font-bold p-2'>Price Details</h1>
          <div className='flex justify-between'>
            <p className='ml-3'>Price </p>
            <p className='mr-8  text-red-500'>{cart.totalPrice} ₹</p>
          </div>
          <div className='flex justify-between'>
            <p className='ml-3'>platform fee</p>
            <p className='mr-8 text-red-500'>50 ₹</p>
          </div>
          <div className='flex justify-between'>
            <p className='ml-3'>Delivery charge</p>
            <p className='mr-8  text-red-500'>50 ₹</p>
          </div>
          <div className='flex justify-between border'>
            <p className='  p-2 font-bold text-lg'>Total Amount</p>
            <p className='mr-8 mt-2 font-bold  text-red-700'>{(cart.totalPrice + 100)} ₹</p>
          </div>


          <div className='flex justify-center mt-11'>
            <button onClick={makePayment} className='p-2 bg-green-400 text-white'>Checkout</button>
          </div>

        </div>
      </div>}
    

    </div>

  )
}

export default CartPage