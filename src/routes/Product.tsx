import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct, IVariant } from '../@Types/productType';
import './Product.scss';
import { Accordion } from 'flowbite-react';
import { getProductById } from '../services/product-service';
import cartService from '../services/cart-service';
import AddToCartButton from '../components/AddToCartButton/AddToCartButton';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then(res => {
                    setProduct(res.data);
                    if (res.data.variants.length > 0) {
                        setSelectedVariant(res.data.variants[0]);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCartAndRedirect = async () => {
        if (!selectedVariant) {
            alert('Please select a size.');
            return;
        }
        try {
            await cartService.addProductToCart(product._id, selectedVariant._id, 1, selectedVariant.size);
            navigate('/cart');
        } catch (error) {
            console.error('Failed to add product to cart.', error);
        }
    };

    return (
        <div className="product-page">
            <div className="product-image-container">
                <img className="product-image" src={product.image.url} alt={product.alt} />
                <div className="additional-images">
                    <img src={product.image.url} alt={product.alt} className="additional-image" />
                    <img src={product.image.url} alt={product.alt} className="additional-image" />
                    <img src={product.image.url} alt={product.alt} className="additional-image" />
                </div>
            </div>
            <div className="product-details">
                <h1 className="product-title">{product.title}</h1>
                <h2 className="product-subtitle">{product.subtitle}</h2>
                <h3 className="product-description">{product.description}</h3>
                <p>{selectedVariant?.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
                <div className="price-container mt-4">
                    <span className="original-price" style={{ marginRight: '15px' }}>
                        ${(selectedVariant?.price * 1.2).toFixed(2)}
                    </span>
                    <span className="discounted-price">
                        ${selectedVariant?.price.toFixed(2)}
                    </span>
                </div>
                
                <div className="size-buttons-container">
                    {product.variants.map((variant) => (
                        <button
                            key={variant.size}
                            className={`size-button ${selectedVariant?.size === variant.size ? 'selected' : ''}`}
                            onClick={() => setSelectedVariant(variant)}
                        >
                            {variant.size}
                        </button>
                    ))}
                </div>

                <div className="buttons-container">
                    <AddToCartButton
                        productId={product._id}
                        variantId={selectedVariant[product._id]?.id}
                        title={product.title}
                        price={selectedVariant?.price || 0}
                        image={product.image.url}
                        size={selectedVariant?.size || ''}
                        onAdd={() => console.log("Product added to cart")}
                    />
                    <button className="consult-expert-button" onClick={handleAddToCartAndRedirect}>Buy Now</button>
                </div>
                <Accordion>
                    <Accordion.Panel>
                        <Accordion.Title>Description</Accordion.Title>
                        <Accordion.Content>
                            <p>{product.description}</p>
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title>Shipping Info</Accordion.Title>
                        <Accordion.Content>
                            <p>Ships by: <strong>Wednesday, July 24</strong></p>
                            <p>Free Fast Shipping</p>
                            <p>Free Overnight Shipping, Hassle-Free Returns</p>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
        </div>
    );
};

export default Product;
