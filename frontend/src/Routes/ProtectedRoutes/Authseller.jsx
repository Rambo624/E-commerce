import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export const Authseller = ({ children }) => {
    const [isUser, setIsUser] = useState(false);

    const navigate = useNavigate()

    const checkUser = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/seller/check-user",
            });
            console.log(response);
            
            setIsUser(true);
            console.log(response);
        } catch (error) {
            setIsUser(false);
            console.log(error);
            navigate('/sellerlogin')
        }
    };

    useEffect(()=>{
        checkUser()
    },[])

    return isUser ? children : null;
};