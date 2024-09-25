import React, { useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { useState } from 'react'
import { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';


function EditProducts() {
  const [subCategory,setsubCategory]=useState([])
  const [Category,setCategory]=useState([])
  const[product,setProduct]=useState([])
const {id}=useParams()

const [successMessage, setSuccessMessage] = useState('')
const title=useRef()
const desc=useRef()
const stock=useRef()
const price=useRef()
const category=useRef()
const subcategory=useRef()
const thumbnail=useRef()


async function handleSubmit(e){
  e.preventDefault()
  const formData = new FormData();
  formData.append('title', title.current.value);
  formData.append('desc', desc.current.value);
  formData.append('stock', stock.current.value);
  formData.append('category', category.current.value);
  formData.append('price', price.current.value);
  formData.append('subcategory', subcategory.current.value);
  
  if (thumbnail.current.files[0]) {
      formData.append('thumbnail', thumbnail.current.files[0]);
    }
    try {
    
     await axiosInstance({method:"PUT",url:`/product/editproduct/${id}`,data:formData ,  headers: {
      'Content-Type': 'multipart/form-data',
    },})
    setSuccessMessage('Changes Saved Successfully'); // Set success message

    // Clear the message after 5 seconds
    setTimeout(() => {
        setSuccessMessage('');
    }, 5000);
    } catch (error) {
      setSuccessMessage('Error'); 

    
    setTimeout(() => {
        setSuccessMessage('');
    }, 5000);
      console.log(error)
    }

}


async function getProduct(){
  const response= await axiosInstance({method:"GET",url:`/product/getproduct/${id}`})
console.log(response.data)
 setProduct(response.data)
 title.current.value = response.data.title;
 desc.current.value = response.data.desc;
 stock.current.value = response.data.stock;
 price.current.value = response.data.price;
 
 // Set the category and subcategory ref values directly
 category.current.value = response.data.category._id;
 subcategory.current.value = response.data.subcategory._id;
}


  async function getCategories(){
    const response= await axiosInstance({method:"GET",url:"/category/categories"})
  
    setCategory(response.data.data)
}

async function getSub(){
  const response= await axiosInstance({method:"GET",url:"/sub/getsub"})

  setsubCategory(response.data.data)
}

useEffect(()=>{
  getCategories()
  getSub()
  getProduct()
},[])
  return (
    <div>
      <form onSubmit={handleSubmit} action="">
      <div>
            <label htmlFor="">Title</label><br />
            <input ref={title}  className='border' type="text" /><br />
            <label htmlFor="">Description</label><br />
            <textarea   ref={desc} className='border' name="desc" id=""></textarea><br />
            <label className='font-medium' htmlFor="">Category</label><br />
            <select    ref={category} className='border p-2 border-black w-60' name="category" id="">
                {Category.map((c)=>( <option key={c._id} value={c._id}>{c.name}</option>))}
            </select><br />
            <label className='font-medium' htmlFor="">Sub-Category</label><br />
            <select ref={subcategory}  className='border p-2 border-black w-60' name="category" id="">
                {subCategory.map((sub)=>(   <option key={sub._id} value={sub._id}>{sub.name}</option>))}
            </select><br />
            <label  htmlFor="">Stock</label><br />
            <input   ref={stock} className='border' type="number" /><br />
            <label htmlFor="">Price</label><br />
            <input   ref={price} className='border' type="number" /><br />
            <label htmlFor="">Thumbnail</label><br />
            <input   ref={thumbnail} className='border' type="file" /><br />
            <button className='p-2 bg-blue-700 text-white'>Save Changes</button>
            <p>{successMessage}</p>
        </div>
      </form>
      
    </div>
  )
}

export default EditProducts