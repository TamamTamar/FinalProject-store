import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, FC } from 'react';
import axios from 'axios';
import { CartContextProps, ICartWithTotals, IVariant } from '../@Types/productType';
import { ContextProviderProps } from '../@Types/types';
import cartService from '../services/cart-service';




export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: FC<ContextProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<ICartWithTotals | null>(null);

    const fetchCart = async () => {
        try {
            const response = await cartService.getCart();
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart', error);
        }
    };

    const addToCart = async (productId: string, variant: IVariant) => {
        try {
            const response = await cartService.addProductToCart(productId, variant._id, 1, variant.size, variant.price);
            setCart(response.data);
        } catch (error) {
            console.error('Error adding to cart', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, setCart, fetchCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
