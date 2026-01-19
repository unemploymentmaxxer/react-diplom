import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SingleProduct from "../pages/SingleProduct";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: 'product/:id',
        element: <SingleProduct/>
    }
])