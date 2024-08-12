import { FC, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import './AddToCartButton.scss';
import { AddToCartButtonProps, IVariant } from '../../@Types/productType';
import useCart from '../../hooks/useCart';
import dialogs from '../../ui/dialogs';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AddToCartButton: FC<AddToCartButtonProps> = ({ productId, variants, title, image, onNotLoggedIn }) => {
    const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(variants[0] || null);
    const { addToCart } = useCart();
    const { token } = useAuth(); // Assuming useAuth provides the user's authentication token
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        if (!token) {
            if (onNotLoggedIn) {
                onNotLoggedIn(); // Call the callback to handle the not-logged-in state
            } else {
                dialogs.error("Login Required", "You need to be logged in to add items to the cart. Please log in first.").then(() => {
                    navigate('/login');
                });
            }
            return;
        }

        if (selectedVariant) {
            console.log("Adding product to cart:", selectedVariant);
            try {
                await addToCart(productId, selectedVariant._id, 1, selectedVariant.size, selectedVariant.price);
                dialogs.success(
                    "Product Added",
                    `<div style="display: flex; align-items: center;">
                        <img src="${image.url}" alt="${title}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;" />
                        <div>
                            <p>${title} has been added to your cart.</p>
                        </div>
                    </div>`
                );
            } catch (error) {
                console.error("Failed to add product to cart:", error);
            }
        } else {
            console.error("No variant selected");
        }
    };

    return (
        <div className="add-to-cart-container">
            <p>{selectedVariant && selectedVariant.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
            <div className="price-container" style={{ marginBottom: '20px', marginTop: '15px' }}>
                <span className="original-price" style={{ marginRight: '10px' }}>
                    ${(selectedVariant?.price * 1.2).toFixed(2)}
                </span>
                <span className="discounted-price">
                    ${selectedVariant?.price.toFixed(2)}
                </span>
            </div>
            <div className="size-buttons-container">
                {variants.map(variant => (
                    <button
                        key={variant._id}
                        className={`size-button ${selectedVariant && selectedVariant._id === variant._id ? 'selected' : ''}`}
                        onClick={() => setSelectedVariant(variant)}
                    >
                        {variant.size}
                    </button>
                ))}
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart} disabled={!selectedVariant}>
                <FiShoppingCart />
                Add to Cart
            </button>
        </div>
    );
};

export default AddToCartButton;
