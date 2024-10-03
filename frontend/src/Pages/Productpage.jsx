import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductCard from '../Components/ProductCard';
import useSub from '../hooks/useSub';
import useCategory from '../hooks/useCategory';

function Productpage() {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const [subProducts, setSubProducts] = useState([]);
  const [catProducts, setCatProducts] = useState([]);
  const { Category } = useCategory();  // Invoke useCategory() as a function
  const { sub } = useSub();            // Invoke useSub() as a function
  const [subname, setSubName] = useState('');
  const [catName, setCatName] = useState('');

  async function getSub() {
    // Filter subcategories based on the id
    const filtersub = sub.find((s) => s._id === id);
    if (filtersub) {
      setSubName(filtersub.name);
      const subProduct = products.filter((s) => s.subcategory._id === id);
      setSubProducts(subProduct);
    }
  }

  async function getCategory() {
    // Filter categories based on the id
    const filterCat = Category.find((c) => c._id === id);
    if (filterCat) {
      setCatName(filterCat.name);
      const catProduct = products.filter((c) => c.category._id === id);
      setCatProducts(catProduct);
    }
  }

  useEffect(() => {
    getSub();
    getCategory();
  }, [products, id, sub, Category]);

  if (loading) return (
    <div className="flex min-h-screen w-52 flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
      <div className="skeleton h-32 w-full"></div>
    </div>
  );

  if(catProducts.length===0) return <div className='md:m-32'><h1 className='min-h-screen text-3xl font-bold'>No Products available</h1></div>

  return (
    <div className="m-4 shadow-grey-200 shadow-lg">
      <h1 className="font-bold text-2xl mb-3">{subname || catName}</h1>
      <div className="flex gap-4 overflow-x-scroll justify-around">
        {subProducts.length > 0
          ? subProducts.map((product) => (
              <ProductCard
                sub_id={product.subcategory._id}
                key={product._id}
                id={product._id}
                image={product.thumbnail}
                title={product.title}
                desc={product.desc}
                price={product.price}
              />
            ))
          : catProducts.map((product) => (
              <ProductCard
                sub_id={product.subcategory._id}
                key={product._id}
                id={product._id}
                image={product.thumbnail}
                title={product.title}
                desc={product.desc}
                price={product.price}
              />
            ))}
      </div>
    </div>
  );
}

export default Productpage;
