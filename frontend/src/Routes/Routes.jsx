
import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from "../Pages/Home";
import RootLayout from "../Layout/RootLayout";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Profile from "../Pages/Profile";
import Edituser from "../Pages/Edituser";
import SellerSignup from "../Pages/SellerSignup";
import SellerLogin from "../Pages/SellerLogin";
import { AuthUser } from "./ProtectedRoutes/AuthUser";
import { Authseller } from "./ProtectedRoutes/Authseller";
import SellerHome from "../Pages/seller/SellerHome";
import Productpage from "../Pages/Productpage";
import ProductDetails from "../Pages/ProductDetails";
import CartPage from "../Pages/CartPage";
import Results from "../Pages/Results";
import PaymentSuccess from "../Pages/PaymentSuccess";
import PaymentFail from "../Pages/PaymentFail";
import {AuthAdmin} from "./ProtectedRoutes/AuthAdmin";
import AdminHome from "../Pages/Admin/AdminHome";
import SellerLayout from "../Layout/SellerLayout";
import SellerProductPage from "../Pages/seller/sellerProductPage";
import AddProduct from "../Pages/seller/AddProduct";
import Orders from "../Pages/Orders";
import Reviews from "../Pages/Reviews";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children:[
{
    path:"login",
    element:<Login/>
},

{
    path:"signup",
    element:<Signup/>
},
{
    path:"sellersignup",
    element:<SellerSignup/>
},
{
    path:"sellerlogin",
    element:<SellerLogin/>
},
{
    path:"",
    element:<Home/>
},
{
    path:"product/:id",
    element:<Productpage/>
},
{
    path:"productdetails/:id",
    element:<ProductDetails/>
},
{
    path:"results",
    element:<Results/>
},


    ]
    
  },
{
    path:"/",
    element:(<AuthUser><RootLayout/></AuthUser>),
    children:[
        {
            path:"profile",
            element:<Profile/>
        },
        {
            path:"edit",
            element:<Edituser/>
        },
        {
            path:"cart/:id",
            element:<CartPage/>
        },
        {
            path:"user/payment/success",
            element:<PaymentSuccess/>
        },
        {
            path:"user/payment/cancel",
            element:<PaymentFail/>
        },
        {
            path:"orders",
            element:<Orders/>
        },
        {
            path:"addreview/:id",
            element:<Reviews/>
        },
      
    ]
},
{
    path:"/seller",
    element:(<Authseller><SellerLayout/></Authseller>),
    children:[
     
        {
          path:"home",
          element:<SellerHome/>  
        },
        {
            path:"sellerProducts",
            element:<SellerProductPage/>
        } ,
        {
            path:"addproduct",
            element:<AddProduct/> 
          },
      
    ]
},
{
    path:"/admin",
    element:(<AuthAdmin><RootLayout/></AuthAdmin>),
    children:[
        {
            path:"home",
            element:<AdminHome/>
        },
        
    ]
}
]);