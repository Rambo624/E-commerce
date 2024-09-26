import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import useSub from '../hooks/useSub';
import useCategory from '../hooks/useCategory';
import { useNavigate } from 'react-router-dom';
function CategoryBar() {
  const { sub, loading, error } = useSub(); // Fetch subcategories
  const { Category } = useCategory(); // Fetch categories
  const navigate=useNavigate()
const [isHover,setIsHover]=useState(false)
const [dropdown,setdropdown]=useState(false)




  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading categories...</h1>;



  function handleMouseEnter(){
    setIsHover(true)
    setdropdown(true)
  }
  function handleMouseLeave(){
    setIsHover(false)
    setdropdown(false)
  }

  function handleSub(sub_id){
    
      navigate(`/product/${sub_id}`)
    
  }


  // Function to filter subcategories for each category
  const getSubcategories = (categoryName) => {
    return sub.filter((subcategory) => subcategory.maincategory.name === categoryName);
  };

  return (
    <div className="shadow-xl m-4 flex justify-around">
      {Category.map((cat) => (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} key={cat.name} className="group relative mb-6">
          {/* Category */}
          <CategoryCard image={cat.image} name={cat.name} />

          {/* Subcategories: Hidden initially, visible on hover */}
          {isHover && dropdown && <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="hidden z-10 group-hover:block absolute top-full left-0 mt-1 bg-white shadow-lg border p-4">
            {getSubcategories(cat.name).length > 0 ? (
              getSubcategories(cat.name).map((subcategory) => (
                
                <div key={subcategory._id} className="m-2 p-2 border-b shadow-sm">
                
                  <p className=' cursor-pointer' onClick={()=>handleSub(subcategory._id)}>{subcategory.name}</p>
                </div>
              ))
            ) : (
              <p className=" text-gray-500">No subcategories available</p>
            )}
          </div>}
          
        </div>
      ))}
    </div>
  );
}

export default CategoryBar;
