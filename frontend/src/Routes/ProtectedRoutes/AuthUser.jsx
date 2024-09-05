import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export const AuthUser = ({ children }) => {
    const [isUser, setIsUser] = useState(false);

    const navigate = useNavigate()

    const checkUser = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/check-user",
            });
            setIsUser(true);
            console.log(response);
        } catch (error) {
            setIsUser(false);
            console.log(error);
            navigate('/login')
        }
    };

    useEffect(()=>{
        checkUser()
    },[])

    return isUser ? children : null;
};