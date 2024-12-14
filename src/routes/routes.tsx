import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "../app/App";
import {Products} from "../features/products/ui/products";
import {Header} from "../components/Header/Header";

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
                path: ":id",
                element: <Header/>,
            },
        ]
    },

]);