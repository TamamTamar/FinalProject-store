import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/root";
import Register from "./register/Register";
import Login from "./Login";
import Profile from "./Profile";
import Error from "./Error";
import Products from "./Products";
import Product from "./Product";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
            errorElement: <Error />, 
        children: [
            { index: true, element: <Products /> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            { path: "/profile", element: <Profile /> },
            { path: "/products/:id", element: <Product /> },

        ],
    },
]);