import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../utils/axiosInstance'




function AddProduct() {
    let seller=useSelector((store)=>store.seller)
    seller=seller.seller.data._id
    console.log(seller)
    const [successMessage, setSuccessMessage] = useState('')
    const [Category,setCategory]=useState([])
    const [loading,setLoading]=useState(true)
    const [subCategory,setsubCategory]=useState([])
const title=useRef()
const desc=useRef()
const stock=useRef()
const thumbnail=useRef()
const category=useRef()
const subcategory=useRef()
const price=useRef()

//functions
async function handleSubmit(e){
    e.preventDefault()
    const formData = new FormData();
    formData.append('title', title.current.value);
    formData.append('desc', desc.current.value);
    formData.append('stock', stock.current.value);
    formData.append('category', category.current.value);
    formData.append('price', price.current.value);
    formData.append('subcategory', subcategory.current.value);
    formData.append('seller', seller);
    if (thumbnail.current.files[0]) {
        formData.append('thumbnail', thumbnail.current.files[0]);
      }
      try {
      
       await axiosInstance({method:"POST",url:"/product/create",data:formData ,  headers: {
        'Content-Type': 'multipart/form-data',
      },})
      setSuccessMessage('Product added Successfully'); // Set success message

      // Clear the message after 5 seconds
      setTimeout(() => {
          setSuccessMessage('');
      }, 5000);
      } catch (error) {
        setSuccessMessage('All fields required'); 

      
      setTimeout(() => {
          setSuccessMessage('');
      }, 5000);
        console.log(error)
      }

}

async function getCategories(){
    const response= await axiosInstance({method:"GET",url:"/category/categories"})
    console.log(response.data.data)
    setCategory(response.data.data)
}
async function getSub(){
    const response= await axiosInstance({method:"GET",url:"/sub/getsub"})
    console.log(response.data.data)
    setsubCategory(response.data.data)
}
//functions
    
useEffect(()=>{
    setLoading(true)
getCategories()
getSub()
setLoading(false)
},[])

if(loading) return <h1>Loading....</h1>


  return (
    <div>
        <form onSubmit={handleSubmit} action="">
        <div>
            <label className='font-medium' htmlFor="">Title</label><br />
            <input ref={title} className='border p-2 border-black w-60' type="text" /><br />
            <label className='font-medium' htmlFor="">Description</label><br />
            <input ref={desc} className='border p-2 border-black w-60' type="text" /><br />
            <label className='font-medium' htmlFor="">Category</label><br />
            <select ref={category} className='border p-2 border-black w-60' name="category" id="">
                {Category.map((c)=>( <option key={c._id} value={c._id}>{c.name}</option>))}
            </select><br />
            <label className='font-medium' htmlFor="">Sub-Category</label><br />
            <select ref={subcategory} className='border p-2 border-black w-60' name="category" id="">
                {subCategory.map((sub)=>(   <option key={sub._id} value={sub._id}>{sub.name}</option>))}
            </select><br />
            <label htmlFor="">Stock</label><br />
            <input ref={stock} className='border p-2 border-black w-60' type="number" /><br />
            <label htmlFor="">Price</label><br />
            <input ref={price} className='border p-2 border-black w-60' type="number" /><br />
            <label htmlFor="">Thumbnail</label><br />
            <input ref={thumbnail} type="file" /><br />
         

            <button type='submit' className='p-2 mt-6 bg-blue-300 text-white'>Submit</button>
            {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
        </div>
        </form>
       
    </div>
  )
}

export default AddProduct