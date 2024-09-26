import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';



const useCategory= ()=>{
    const [Category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    async function getSub() {
        try {
            const response = await axiosInstance({
                method: 'GET',
                url: '/category/categories',
              });
           
            
              setCategory(response.data.data);
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
       
      }

      useEffect(()=>{
        getSub()
              },[])
              return {Category,loading,error}
        
}

export default useCategory