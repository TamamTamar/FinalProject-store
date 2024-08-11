import axios from 'axios';
import { IOrder } from '../@Types/productType';

const analyticsUrl = 'https://projectnodeshop.onrender.com/api/v1/analytics';

const getSalesByDate = (startDate: string, endDate: string) => {
    const url = `${analyticsUrl}/sales-by-date`;
    return axios.get(url, {
        params: { startDate, endDate },
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

export const getAllOrders = () => {
    const url = `${analyticsUrl}/all-orders`;
    return axios.get(url, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};

export const updateOrderStatus = (order: IOrder, status: string) => {
    const url = `${analyticsUrl}/status/${order.orderId}`;
    return axios.patch(url, { status }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
}

const analyticsService = { getSalesByDate, getAllOrders, updateOrderStatus };

export default analyticsService;
