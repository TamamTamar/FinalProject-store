import axios from 'axios';

const baseUrl = "http://localhost:8080/api/v1";
const cartUrl = `${baseUrl}/cart`;

// Get cart items
export const getCart = () => {
    return axios.get(cartUrl, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

// Add product to cart
export const addProductToCart = ( productId: string, variantId: string, quantity: number, size: string, price: number) => {
    console.log('Sending to API:', {productId, variantId, quantity, size, price });
    return axios.post(`${cartUrl}/add`, {
        productId,
        variantId,
        quantity,
        size,
        price
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

// Update product quantity
export const updateProductQuantity = ( variantId: string, quantity: number) => {
    return axios.patch(`${cartUrl}/update`, {
        variantId,
        quantity
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

// Remove product from cart
export const removeProductFromCart = (variantId: string) => {
    return axios.post(`${cartUrl}/remove`, {
        variantId
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

// Clear cart
export const clearCart = () => {
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
