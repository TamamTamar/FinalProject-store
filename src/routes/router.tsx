import { createBrowserRouter } from "react-router-dom";
import ProtectedRouteAdmin from "../components/ProtectedRouteAdmin";
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
                path: "/admin/create-product", element:
                    <ProtectedRouteAdmin>
                        <CreateProduct />
                    </ProtectedRouteAdmin>
            },
            { path: "/products", element: <Products /> },
            {
                path: "/admin/users", element: <Users />

            },
            { path: "/admin/Products", element: <AdminProducts /> },
            { path: "/users/:id", element: <UpdateUser /> },
            { path: "/admin/products/:id", element: <EditProduct /> },
            { path: "/cart", element: <Cart /> },
            {
                path: "/order-confirmation/:orderId", element: < OrderConfirmation />
            },
            {
                path: "/orders", element: <UserOrders />
            },
            {
                path: "/admin/analytics", element: < SalesPage />
            },
            { path: "/admin/orders", element: <AdminOrders /> },
            { path: "/contact", element: <Message /> },
            { path: "/admin/messages", element: <AdminMessages /> },
            {
                path: "/admin/dashboard", element: <AdminDashboard />
            },
            { path: "/about", element: <About /> },
        ],
    },
]);