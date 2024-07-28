import axios from 'axios';

const baseUrl = "http://localhost:8080/api/v1";
const cartUrl = `${baseUrl}/cart`;

export const getCart = () => {
    return axios.get(cartUrl, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

//add product to cart
export const addProductToCart = (productId: string, variantId: string, quantity: number, size: string) => {
    return axios.post(`${cartUrl}/add`, {
        productId,
        variantId,
        quantity,
        size
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};


//update product quantity
export const updateProductQuantity = (productId: string, quantity: number) => {
    return axios.patch(`${ cartUrl }/update`, {
        productId,
        quantity
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

//remove product from cart
export const removeProductFromCart = (productId: string) => {
    return axios.post(`${cartUrl}/remove`, {
        productId
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

export const cartService = {
    getCart,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
    clearCart
};

export default cartService;