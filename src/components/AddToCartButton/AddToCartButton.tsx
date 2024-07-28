import React, { FC, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import './AddToCartButton.scss';
import { useCart } from '../../hooks/useCart';
import cart, { cartService } from '../../services/cart-service';
import { showPopup } from '../../ui/dialogs';
import { AddToCartButtonProps, IVariant } from '../../@Types/productType';

const AddToCartButton: FC<AddToCartButtonProps> = ({ productId, variants, title, image, onAdd }) => {
    const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(variants[0] || null);

    const handleAddToCart = async () => {
        if (!selectedVariant) {

            return;
        }

        try {
            await cartService.addProductToCart(productId, selectedVariant._id, 1, selectedVariant.size);
            onAdd();
        } catch (error) {
            console.error('Failed to add product to cart.', error);
        
        }
    };

    return (
        <div className="add-to-cart-button-container">
            <div className="size-buttons-container">
                {variants.map(variant => (
                    <button
                        key={variant.size}
                        className={`size-button ${selectedVariant?.size === variant.size ? 'selected' : ''}`}
                        onClick={() => setSelectedVariant(variant)}
                    >
                        {variant.size}
                    </button>
                ))}
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};

export default AddToCartButton;