import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "../app/App";
import {Products} from "../features/products/ui/products";
import {ProductItem} from "../components/ProductItem/ProductItem";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <App/>,
        children: [
            {
                path: "/",
                element: <Navigate to="/products" replace/>,
            },
            {
                path: "/products",
                element: <Products/>,
            },
            {
                path: "/products/:id",
                element: <ProductItem/>,
            },
        ]
    },

]);