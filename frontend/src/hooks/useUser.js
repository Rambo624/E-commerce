import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';



const useUser= ()=>{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    async function getUser() {
        try {
            const response = await axiosInstance({
                method: 'GET',
                url: '/profile',
              });
           
           
              setUsers(response.data);
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
       
      }

      useEffect(()=>{
        getUser()
              },[])
              return {users,loading,error}
        
}

export default useUser