import axios from "axios";
import { IOrderProduct } from "../@Types/productType";

export const orderUrl = "http://localhost:8080/api/v1/orders";

// Create an order
export const createOrder = (products: IOrderProduct[]) => {
    return axios.post(orderUrl, { products }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};
// Get all orders
export const getOrdersByUser = (userId: string) => {
    return axios.get(`${orderUrl}/user/${userId}`, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};
// Get an order
export const getOrderByOrderId = (orderId: string) => {
    return axios.get(`${orderUrl}/${orderId}`, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};
// Cancel an order
export const cancelOrder = (orderId: string) => {
    return axios.patch(`${orderUrl}/cancel/${orderId}`, {}, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

export const orderService = {
    createOrder,
    getOrdersByUser,
    getOrderByOrderId,
    cancelOrder,
};

export default orderService;
