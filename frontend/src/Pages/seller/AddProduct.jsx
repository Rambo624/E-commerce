import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';

function AddProduct() {
    const seller = useSelector((store) => store.seller.seller.data._id);
    const [successMessage, setSuccessMessage] = useState('');
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subCategory, setSubCategory] = useState([]);

    const title = useRef();
    const desc = useRef();
    const stock = useRef();
    const thumbnail = useRef();
    const categoryRef = useRef();
    const subcategoryRef = useRef();
    const price = useRef();

    // Functions
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title.current.value);
        formData.append('desc', desc.current.value);
        formData.append('stock', stock.current.value);
        formData.append('category', categoryRef.current.value);
        formData.append('price', price.current.value);
        formData.append('subcategory', subcategoryRef.current.value);
        formData.append('seller', seller);
        
        if (thumbnail.current.files[0]) {
            formData.append('thumbnail', thumbnail.current.files[0]);
        }

        try {
            await axiosInstance({
                method: "POST",
                url: "/product/create",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('Product added successfully!');

            // Clear the message after 5 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        } catch (error) {
            setSuccessMessage('All fields required');
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
            console.log(error);
        }
    }

    async function getCategories() {
        const response = await axiosInstance({ method: "GET", url: "/category/categories" });
        setCategory(response.data.data);
    }

    async function getSub() {
        const response = await axiosInstance({ method: "GET", url: "/sub/getsub" });
        setSubCategory(response.data.data);
    }

    useEffect(() => {
        setLoading(true);
        getCategories();
        getSub();
        setLoading(false);
    }, []);

    if (loading) return <h1>Loading....</h1>;

    return (
        <div className="mx-auto max-w-2xl md:p-6  bg-white rounded-lg shadow-md">
            <h1 className="md:text-2xl text-lg  font-semibold mb-6">Add New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4 mb-10">
                <div>
                    <label className='font-medium' htmlFor="">Title</label><br />
                    <input ref={title} className='border p-2 border-gray-300 md:w-full rounded-md' type="text" required />
                </div>
                <div>
                    <label className='font-medium' htmlFor="">Description</label><br />
                    <textarea ref={desc} className='border p-2 border-gray-300 md:w-full rounded-md' rows="4" required></textarea>
                </div>
                <div>
                    <label className='font-medium' htmlFor="">Category</label><br />
                    <select ref={categoryRef} className='border p-2 border-gray-300 md:w-full rounded-md' required>
                        <option value="" disabled>Select a category</option>
                        {category.map((c) => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='font-medium' htmlFor="">Sub-Category</label><br />
                    <select ref={subcategoryRef} className='border p-2 border-gray-300 md:w-full rounded-md' required>
                        <option value="" disabled>Select a sub-category</option>
                        {subCategory.map((sub) => (
                            <option key={sub._id} value={sub._id}>{sub.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Stock</label><br />
                    <input ref={stock} className='border p-2 border-gray-300 md:w-full rounded-md' type="number" required />
                </div>
                <div>
                    <label htmlFor="">Price</label><br />
                    <input ref={price} className='border p-2 border-gray-300 md:w-full rounded-md' type="number" required />
                </div>
                <div>
                    <label htmlFor="">Thumbnail</label><br />
                    <input ref={thumbnail} className='border p-2 border-gray-300 w-52 md:w-full rounded-md' type="file" accept="image/*" />
                </div>
                <button type='submit' className='p-2 mt-4 mb-10 bg-blue-600 text-white rounded-md hover:bg-blue-700'>Submit</button>
                {successMessage && <p className="mt-4 text-green-500 ">{successMessage}</p>}
            </form>
        </div>
    );
}

export default AddProduct;
