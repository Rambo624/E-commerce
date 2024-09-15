import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export const AuthAdmin = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
   
    const navigate = useNavigate()

    const checkUser = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/seller/check-user",
            });
         //   console.log(response);
        
         if(response.data.data==="admin"){
            setIsAdmin(true)
            navigate("/admin/home")
        }
       else{
        navigate('/sellerlogin')
       }
           
        } catch (error) {
            setIsAdmin(false);
     
            console.log(error,"error");
            navigate('/sellerlogin')
        }
    };

    useEffect(()=>{
        checkUser()
    },[])

    return isAdmin ? children : null;
};