import React, { useEffect, useState, useRef } from 'react';
import useCategory from '../../hooks/useCategory';
import axiosInstance from '../../utils/axiosInstance';

function AddSub() {

    const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage,setErrorMessage]=useState("")
const {Category,loading,error}=useCategory()
console.log(Category)
    const title = useRef();
 
  const maincategory=useRef()

   

    // Functions
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(title.current.value)
        console.log(maincategory.current.value)
   const data={
    name:title.current.value,
    maincategory:maincategory.current.value
   }
        
      

        try {
         const response=   await axiosInstance({
                method: "POST",
                url: "/sub/createsub",
                data: data
              
            });
           if(response.data.message==="Sub-Category already exist"){
         setErrorMessage('Sub-Category already exist');
        return setTimeout(() => {
            setErrorMessage('');
        }, 5000);
           }
            setSuccessMessage('Sub-Category added successfully!');

            // Clear the message after 5 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        } catch (error) {

            setErrorMessage('All fields required');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
            console.log(error);
        }
    }

   


   



    return (
        <div className="mx-auto max-w-2xl p-6 bg-white rounded-lg shadow-md">
            <h1 className="md:text-2xl text-lg font-semibold mb-6">Add New Sub-Category</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className='font-medium' htmlFor="">Title</label>
                    <input ref={title} className='border p-2 border-gray-300 w-full rounded-md' type="text" required />
                </div>
             
                <div>
                    <label className='font-medium' htmlFor="">Main Category</label><br />
                   <select ref={maincategory} className='border p-2 rounded-md w-full ' name="" id="">
                {Category.map((c)=>(<option key={c._id}  value={c._id}>{c.name}</option>))}
                   </select>
                </div>
             
             
               
                <button type='submit' className='p-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700'>Submit</button>
                {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
                {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p> }
            </form>
        </div>
    );
}

export default AddSub;
