import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export const Authseller = ({ children }) => {
    const [isSeller, setIsSeller] = useState(false);
   
    const navigate = useNavigate()

    const checkUser = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/seller/check-user",
            });
         //   console.log(response);
        if(response.data.data==="seller"){
            setIsSeller(true)
            navigate("/seller/home")
        }
       else{
        navigate('/sellerlogin')
       }
      
           
        } catch (error) {
            setIsSeller(false);
     
            console.log(error,"error");
            navigate('/sellerlogin')
        }
    };

    useEffect(()=>{
        checkUser()
    },[])

    return isSeller ? children : null;
};