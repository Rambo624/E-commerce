import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';



const useSub= ()=>{
    const [sub, setSub] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    async function getSub() {
        try {
            const response = await axiosInstance({
                method: 'GET',
                url: '/sub/getsub',
              });
           
            
              setSub(response.data.data);
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
       
      }

      useEffect(()=>{
        getSub()
              },[])
              return {sub,loading,error}
        
}

export default useSub