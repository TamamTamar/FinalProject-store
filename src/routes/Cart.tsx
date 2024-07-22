import { useState } from 'react';
import cartService from '../services/cart';
import { ICartItem } from '../@Types/productType';
import './Cart.scss';
import { useCart } from '../hooks/useCart';

const Cart = () => {
    const { cart, fetchCart } = useCart();
    const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});

    const handleRemoveItem = async (productId: string) => {
        try {
            await cartService.removeProductFromCart(productId, 1);
            fetchCart();
        } catch (error) {
            console.error('Failed to remove product from cart.', error);
        }
    };

    const handleClearCart = async () => {
        try {
            await cartService.clearCart();
            fetchCart();
        } catch (error) {
            console.error('Failed to clear cart.', error);
        }
    };

    const handleQuantityChange = async (productId: string, newQuantity: number) => {
        try {
            setQuantities(prevQuantities => ({
                ...prevQuantities,
                [productId]: newQuantity,
            }));
            await cartService.updateProductQuantity(productId, newQuantity);
            fetchCart();
        } catch (error) {
            console.error('Failed to update product quantity.', error);
        }
    };

    if (!cart || cart.items.length === 0) {
        return <div>Your cart is empty</div>;
    }

    return (
        <div className="cart-page flex flex-col md:flex-row">
            <div className="cart-items-container w-full md:w-3/4 p-4">
                <h1 className="cart-title text-2xl font-semibold mb-4">Your Shopping Cart</h1>
                <div className="cart-items space-y-4">
                    {cart.items.map((item: ICartItem) => (
                        <div className="cart-item flex justify-between items-center p-4 border rounded-lg shadow-sm" key={item.productId}>
                            <div className="flex items-center">
                                <img src={item.image.url} className="w-20 h-20 object-cover rounded-lg mr-4" />
                                <div>
                                    <h2 className="item-title text-lg font-medium">{item.title}</h2>
                                    <p className="item-quantity text-sm text-gray-500">Quantity: 
                                        <select
                                            value={quantities[item.productId] || item.quantity}
                                            onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                                            className="ml-2"
                                        >
                                            {[...Array(10).keys()].map((n) => (
                                                <option key={n + 1} value={n + 1}>
                                                    {n + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </p>
                                    <p className="item-price text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <button onClick={() => handleRemoveItem(item.productId)} className="remove-button">Remove</button>
                        </div>
                    ))}
                    <button onClick={handleClearCart} className="clear-cart-button">Clear Cart</button> 
                </div>
            </div>
            <div className="cart-summary w-full md:w-1/4 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Summary</h2>
                <div className="space-y-2 flex flex-col">
                    <div className='flex flex-row'>
                        <span>Total Items</span>
                        <span>{cart.totalQuantity}</span>
                    </div>
                    <div className='flex flex-row'>
                        <span>Total Price</span>
                        <span>${cart.totalPrice.toFixed(2)}</span>
                    </div>
                </div>
                <button className="checkout-button">Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
