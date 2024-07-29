import { FC, useState } from 'react';
import { AddToCartButtonProps, IImage, IVariant } from '../../@Types/productType';
import useCart from '../../hooks/useCart';
import dialogs from '../../ui/dialogs';


const AddToCartButton: FC<AddToCartButtonProps> = ({ productId, variants, title, image }) => {
    const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);
    const { addToCart } = useCart();

    const handleAddToCart = async () => {
        if (selectedVariant) {
            try {
                await addToCart(productId, selectedVariant._id, 1, selectedVariant.size, selectedVariant.price);
                dialogs.success("Product Added", "Product added to cart");
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
