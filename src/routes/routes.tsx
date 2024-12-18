import {createHashRouter, Navigate} from "react-router-dom";
import App from "../app/App";
import {Products} from "../features/products/ui/products";
import {ProductItem} from "../components/ProductItem/ProductItem";
import {CreateProduct} from "../components/CreateProduct/CreateProduct";

export const router = createHashRouter([
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
                {
                    path: "/create-product",
                    element: <CreateProduct/>,
                },
            ],

        },

    ],
);