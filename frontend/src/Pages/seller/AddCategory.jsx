import React, { useEffect, useState, useRef } from 'react';

import axiosInstance from '../../utils/axiosInstance';

function AddCategory() {
    
    const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage,setErrorMessage]=useState("")

    const title = useRef();
    const desc = useRef();
  
    const thumbnail = useRef();
   

    // Functions
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', title.current.value);
        formData.append('description', desc.current.value);
     
        
        if (thumbnail.current.files[0]) {
            formData.append('image', thumbnail.current.files[0]);
        }

        try {
         const response=   await axiosInstance({
                method: "POST",
                url: "/category/createcategory",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
           if(response.data.message==="Category already exist"){
         setErrorMessage('Category already exist');
        return setTimeout(() => {
            setErrorMessage('');
        }, 5000);
           }
            setSuccessMessage('Category added successfully!');

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
            <h1 className="md:text-2xl text-lg font-semibold mb-6">Add New Category</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className='font-medium' htmlFor="">Title</label>
                    <input ref={title} className='border p-2 border-gray-300 w-full rounded-md' type="text" required />
                </div>
                <div>
                    <label className='font-medium' htmlFor="">Description</label>
                    <textarea ref={desc} className='border p-2 border-gray-300 w-full rounded-md' rows="4" required></textarea>
                </div>
            
             
             
                <div>
                    <label htmlFor="">Thumbnail</label>
                    <input ref={thumbnail} className='border p-2 border-gray-300 w-full rounded-md' type="file" accept="image/*" />
                </div>
                <button type='submit' className='p-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700'>Submit</button>
                {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
                {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p> }
            </form>
        </div>
    );
}

export default AddCategory;
