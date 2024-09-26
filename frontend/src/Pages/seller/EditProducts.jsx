import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useParams } from 'react-router-dom';

function EditProducts() {
    const [subCategory, setsubCategory] = useState([]);
    const [Category, setCategory] = useState([]);
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const [successMessage, setSuccessMessage] = useState('');
    const title = useRef();
    const desc = useRef();
    const stock = useRef();
    const price = useRef();
    const category = useRef();
    const subcategory = useRef();
    const thumbnail = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
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
            await axiosInstance({
                method: "PUT",
                url: `/product/editproduct/${id}`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('Changes Saved Successfully');

            // Clear the message after 5 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        } catch (error) {
            setSuccessMessage('Error');
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
            console.log(error);
        }
    }

    async function getProduct() {
        const response = await axiosInstance({ method: "GET", url: `/product/getproduct/${id}` });
        setProduct(response.data);
        title.current.value = response.data.title;
        desc.current.value = response.data.desc;
        stock.current.value = response.data.stock;
        price.current.value = response.data.price;
        category.current.value = response.data.category._id;
        subcategory.current.value = response.data.subcategory._id;
    }

    async function getCategories() {
        const response = await axiosInstance({ method: "GET", url: "/category/categories" });
        setCategory(response.data.data);
    }

    async function getSub() {
        const response = await axiosInstance({ method: "GET", url: "/sub/getsub" });
        setsubCategory(response.data.data);
    }

    useEffect(() => {
        getCategories();
        getSub();
        getProduct();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="">Title</label><br />
                    <input ref={title} className='border p-2 border-gray-300 w-full' type="text" required /><br />
                </div>
                <div className="mb-4">
                    <label htmlFor="">Description</label><br />
                    <textarea ref={desc} className='border p-2 border-gray-300 w-full' required></textarea><br />
                </div>
                <div className="mb-4">
                    <label className='font-medium' htmlFor="">Category</label><br />
                    <select ref={category} className='border p-2 border-gray-300 w-full' required>
                        {Category.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                    </select><br />
                </div>
                <div className="mb-4">
                    <label className='font-medium' htmlFor="">Sub-Category</label><br />
                    <select ref={subcategory} className='border p-2 border-gray-300 w-full' required>
                        {subCategory.map((sub) => (<option key={sub._id} value={sub._id}>{sub.name}</option>))}
                    </select><br />
                </div>
                <div className="mb-4">
                    <label htmlFor="">Stock</label><br />
                    <input ref={stock} className='border p-2 border-gray-300 w-full' type="number" required /><br />
                </div>
                <div className="mb-4">
                    <label htmlFor="">Price</label><br />
                    <input ref={price} className='border p-2 border-gray-300 w-full' type="number" required /><br />
                </div>
                <div className="mb-4">
                    <label htmlFor="">Thumbnail</label><br />
                    <input ref={thumbnail} className='border p-2 border-gray-300 w-full' type="file" /><br />
                </div>
                <button type='submit' className='p-2 mt-6 bg-blue-600 text-white rounded hover:bg-blue-700'>Save Changes</button>
                {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
            </form>
        </div>
    );
}

export default EditProducts;
