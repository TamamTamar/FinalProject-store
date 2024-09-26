import { createBrowserRouter } from "react-router-dom";
import ProtectedRouteAdmin from "../components/ProtectedRouteAdmin";
import ProtectedRouteUser from "../components/ProtectedRouteUser";
import Root from "../layout/root";
import AdminProducts from "./AdminProducts";
import CreateProduct from "./CreateProduct";
import Error from "./Error";
import Login from "./Login";
import Product from "./Product";
import Products from "./Products";
import Profile from "./Profile";
import Register from "./register/Register";
import UpdateUser from "./UpdateUser";
import Users from "./Users";
import Cart from "./Cart";
import OrderConfirmation from "./OrderConfirmation";
import UserOrders from "./UserOrders";
import SalesPage from "./SalesByDate";
import EditProduct from "./EditProduct";
import AdminOrders from "./AdminOrders";
import AdminMessages from "./AdminMessage";
import AdminDashboard from "./AdminDashboard";
import { CarouselComponent } from "../components/Carousel";
import About from "./About";
import Message from "./Message";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            { index: true, element: <><CarouselComponent /><Products /></> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            { path: "/profile", element: <Profile /> },
            { path: "/products/:id", element: <Product /> },

            {
                path: "/admin/create-product",
                element: (
                    <ProtectedRouteAdmin>
                        <CreateProduct />
                    </ProtectedRouteAdmin>
                ),
            },
            { path: "/products", element: <Products /> },
            {
                path: "/admin/users",
                element: (
                    <ProtectedRouteAdmin>
                        <Users />
                    </ProtectedRouteAdmin>
                ),
            },
            {
                path: "/admin/products",
                element: (
                    <ProtectedRouteAdmin>
                        <AdminProducts />
                    </ProtectedRouteAdmin>
                ),
            },
            { path: "/users/:id", element: <UpdateUser /> },
            {
                path: "/admin/products/:id",
                element: (
                    <ProtectedRouteAdmin>
                        <EditProduct />
                    </ProtectedRouteAdmin>
                ),
            },
            {
                path: "/cart",
                element: (
                    <ProtectedRouteUser>
                        <Cart />
                    </ProtectedRouteUser>
                ),
            },
            {
                path: "/order-confirmation/:orderId",
                element: (
                    <ProtectedRouteUser>
                        <OrderConfirmation />
                    </ProtectedRouteUser>
                ),
            },
            {
                path: "/orders",
                element: (
                    <ProtectedRouteUser>
                        <UserOrders />
                    </ProtectedRouteUser>
                ),
            },
            {
                path: "/admin/analytics",
                element: (
                    <ProtectedRouteAdmin>
                        <SalesPage />
                    </ProtectedRouteAdmin>
                ),
            },
            {
                path: "/admin/orders",
                element: (
                    <ProtectedRouteAdmin>
                        <AdminOrders />
                    </ProtectedRouteAdmin>
                ),
            },
            { path: "/contact", element: <Message /> },
            {
                path: "/admin/messages",
                element: (
                    <ProtectedRouteAdmin>
                        <AdminMessages />
                    </ProtectedRouteAdmin>
                ),
            },
            {
                path: "/admin/dashboard",
                element: (
                    <ProtectedRouteAdmin>
                        <AdminDashboard />
                    </ProtectedRouteAdmin>
                ),
            },
            { path: "/about", element: <About /> },

        ],
    },
]);
