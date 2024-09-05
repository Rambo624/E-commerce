
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
    path:"",
    element:<Home/>
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
    ]
}
]);