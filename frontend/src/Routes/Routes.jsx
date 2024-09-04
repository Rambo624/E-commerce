
import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from "../Pages/Home";
import RootLayout from "../Layout/RootLayout";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Profile from "../Pages/Profile";
import Edituser from "../Pages/Edituser";


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
    path:"profile",
    element:<Profile/>
},
{
    path:"edit",
    element:<Edituser/>
}
    ]
    
  },
]);