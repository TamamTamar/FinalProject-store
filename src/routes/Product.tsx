import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct } from '../@Types/productType';
import './Product.scss';
import { Accordion } from 'flowbite-react';
import { getProductById } from '../services/product-service';
import cartService from '../services/cart-service';
import AddToCartButton from '../components/AddToCartButton/AddToCartButton';
import { format } from 'date-fns';
import dialogs from '../ui/dialogs';
import { useVariant } from '../hooks/useVariant';


const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const { selectedVariant, setSelectedVariant } = useVariant();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then(res => {
                    const productData = res.data;
                    setProduct(productData);
                    setSelectedVariant(productData.variants[0] || null);
                })
                .catch(err => console.log('Failed to fetch product:', err));
        }
    }, [id]);

    const handleAddToCartAndRedirect = async () => {
        if (!product || !selectedVariant) {
            console.error('No variant selected or product is not loaded');
            return;
        }

        console.log('Adding product to cart:', selectedVariant);
        

        try {
            await cartService.addProductToCart(
                product._id,
                selectedVariant._id || '',
                1,
                selectedVariant.size,
                selectedVariant.price
            );

            dialogs.success(
                'Product Added',
                `<div style="display: flex; align-items: center;">
                    <img src="${product.image.url}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;" />
                    <div>
                        <p>${product.title} has been added to your cart.</p>
                    </div>
                </div>`
            );
            navigate('/cart');
        } catch (error) {
            console.error('Failed to add product to cart.', error);
        }
    };

    const getEstimatedArrivalDate = (): string => {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7); // להוסיף 7 ימים
        return format(deliveryDate, 'PPP'); // פורמט התאריך
    };

    if (!product) {
        return <div>Loading...</div>;
    }

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

                <div className="buttons-container">
                    <AddToCartButton
                        productId={product._id}
                        variants={product.variants}
                        title={product.title}
                        image={product.image}
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
                            <p>Ships by: <strong>FedEx</strong></p>
                            <p>Estimated arrival date: <strong>{getEstimatedArrivalDate()}</strong></p>
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
