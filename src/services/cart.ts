import axios from 'axios';

const baseUrl = "http://localhost:8080/api/v1";
const cartUrl = `${baseUrl}/cart`;

//get cart
export const getCart = () => {
    return axios.get(cartUrl, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

//add product to cart
export const addProductToCart = (productId: string, quantity: number, size: string) => {
    return axios.post(`${cartUrl}/add`, {
        productId,
        quantity,
        size
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

//remove product from cart
export const removeProductFromCart = (productId: string, quantity: number) => {
    return axios.post(`${cartUrl}/remove`, {
        productId,
        quantity
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

//clear cart
export const clearCart = (/* token: string */) => {
    return axios.delete(`${cartUrl}/clear`, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

//update product quantity
export const updateProductQuantity = (productId: string, quantity: number) => {
    return axios.patch(`${cartUrl}/update`, {
        productId,
        quantity
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
}

export const cart = {
    getCart,
    addProductToCart,
    removeProductFromCart,
    clearCart,
    updateProductQuantity
};

export default cart;