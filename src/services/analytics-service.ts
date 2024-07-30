import axios from 'axios';

const analyticsUrl = 'http://localhost:8080/api/v1/analytics';

const getSalesByDate = (startDate: string, endDate: string) => {
    return axios.get(`${analyticsUrl}/sales-by-date`, {
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
export const deleteOrderById = (id: string) => {
    const url = `${analyticsUrl}/${id}`;
    return axios.delete(url, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};

const analyticsService = { getSalesByDate , getAllOrders };

export default analyticsService;
