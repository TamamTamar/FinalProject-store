import React, { FC } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

import './AddToCartButton.scss';    
import { useCart } from '../../hooks/useCart';
import cart from '../../services/cart';


const AddToCartButton: FC<{ productId: string, onAdd: () => void }> = ({ productId, onAdd }) => {
    const { fetchCart } = useCart();
    const handleAddToCart = async () => {
        try {
                await cart.addProductToCart(productId, 1, 'S'); // לדוגמה, ניתן לשנות בהתאם לצורך
             fetchCart();
                onAdd();
          
        } catch (error) {
            console.error('Failed to add product to cart.', error);
        }
    };

    return (
        <button onClick={handleAddToCart} className="add-to-cart-button">
            <FiShoppingCart size={24} />
           Add to cart
        </button>
    );
};

export default AddToCartButton;