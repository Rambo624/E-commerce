import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';



const useOrders= ()=>{

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    async function getOrders() {
        try {
            const response = await axiosInstance({
                method: 'GET',
                url: '/admin/getorders',
              });
           
              
              setOrders(response.data.data);
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
       
      }


      useEffect(()=>{
getOrders()
      },[])

      return {orders,loading,error}
}

export default useOrders