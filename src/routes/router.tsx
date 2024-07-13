import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/root";
import Register from "./register/Register";
import Login from "./Login";
import Profile from "./Profile";
import Error from "./Error";
import Products from "./Products";
import Product from "./Product";
import CreateProduct from "./CreateProduct";
import ProtectedRoute from "../components/ProtectedRouteUser";
import ProtectedRouteUser from "../components/ProtectedRouteUser";
import ProtectedRouteAdmin from "../components/ProtectedRouteAdmin";
import Users from "./Users";
import UpdateUser from "./UpdateUser";
import AdminProducts from "./deleteProduct";
import EditProduct from "./updeteProduct";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
            errorElement: <Error />, 
        children: [
            { index: true, element: <Products /> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            { path: "/profile", element:
                <ProtectedRouteUser>
                 <Profile /> 
                </ProtectedRouteUser>
                },
            { path: "/products/:id", element: <Product /> },

            {path:"/admin/create-product", element:
                <ProtectedRouteAdmin>
                 <CreateProduct />
                </ProtectedRouteAdmin>
                },
            {path: "/products", element: <Products />},
            {path:"/admin/users", element:  <Users />
               
                },
                {path:"/admin/Products", element: <AdminProducts />},
                {path: "/users/:id", element: <UpdateUser />},
                {path:"/admin/products/:id", element: <EditProduct />},

        ],
    },
]);