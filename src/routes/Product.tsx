import { format } from 'date-fns';
import { Accordion } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct, IVariant } from '../@Types/productType';
import AddToCartButton from '../components/AddToCartButton/AddToCartButton';
import { getProductById } from '../services/product-service';
import './Product.scss';


const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then(res => {
                    const productData = res.data;
                    setProduct(productData);
                })
                .catch(err => console.log('Failed to fetch product:', err));
        }
    }, [id]);

    const getEstimatedArrivalDate = (): string => {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7);
        return format(deliveryDate, 'PPP');
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
                            onNotLoggedIn={() => navigate('/login')}
                        />
  
                 
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
