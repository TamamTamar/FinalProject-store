import React, { createContext, useContext, useState, useEffect, FC } from 'react';
import { CartContextProps, ICartWithTotals } from '../@Types/productType';
import { ContextProviderProps } from '../@Types/types';
import cartService from '../services/cart-service';
import { useAuth } from '../hooks/useAuth';

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: FC<ContextProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<ICartWithTotals | null>(null);
    const { token } = useAuth();

    const fetchCart = async () => {
        if (!token) return setCart(null);
        try {
            const response = await cartService.getCart();
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart', error);
        }
    };

    const addToCart = async (productId: string, variantId: string, quantity: number, size: string, price: number) => {
        try {
            await cartService.addProductToCart(productId, variantId, quantity, size, price);
            fetchCart();
        } catch (error) {
            console.error('Error adding to cart', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [token]);

    return (
        <CartContext.Provider value={{ cart, setCart, fetchCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
