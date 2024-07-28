import { FC, useState } from 'react';
import { AddToCartButtonProps, IImage, IVariant } from '../../@Types/productType';
import cartService from '../../services/cart-service';


const AddToCartButton: FC<AddToCartButtonProps> = ({ productId, variants, title, image }) => {
    const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);

    const handleAddToCart = async () => {
        if (selectedVariant) {
            console.log('Selected Variant:', selectedVariant); // Add this line for debugging

            try {
                await cartService.addProductToCart(
                    productId,
                    selectedVariant._id,
                    1, // Quantity can be updated as needed
                    selectedVariant.size,
                    selectedVariant.price // Ensure price is passed correctly
                );
                console.log(`Added product ${productId} with variant ${selectedVariant._id} to cart`);
            } catch (error) {
                console.error("Failed to add product to cart:", error);
            }
        } else {
            console.error("No variant selected");
        }
    };

    return (
        <div>
            <select
                onChange={(e) => {
                    const variantId = e.target.value;
                    const variant = variants.find(v => v._id === variantId);
                    console.log('Selected Variant ID:', variantId); // Add this line for debugging
                    console.log('Found Variant:', variant); // Add this line for debugging
                    setSelectedVariant(variant || null);
                }}
            >
                <option value="">Select a size</option>
                {variants.map(variant => (
                    <option key={variant._id} value={variant._id}>
                        {variant.size}
                    </option>
                ))}
            </select>
            <button onClick={handleAddToCart} disabled={!selectedVariant}>
                Add to Cart
            </button>
        </div>
    );
};

export default AddToCartButton;
