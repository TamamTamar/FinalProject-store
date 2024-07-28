import { useState, useEffect, FC } from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import './Products.scss';
import { IProduct } from '../@Types/productType';
import { useSearch } from '../hooks/useSearch';
import { getAllProducts } from '../services/product-service';
import cartService from '../services/cart-service';
import AddToCartButton from '../components/AddToCartButton/AddToCartButton';
import dialogs from '../ui/dialogs';

const Products: FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { searchTerm } = useSearch();
    const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                setProducts(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        [product.title, product.subtitle, product.description].some(field =>
            field.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleSizeSelect = (productId: string, size: string) => {
        setSelectedSizes(prevSizes => ({
            ...prevSizes,
            [productId]: size,
        }));
    };

    return (
        <div className="product-list-container">
            {filteredProducts.length === 0 ? (
                <p>No products found</p>
            ) : (
                filteredProducts.map(product => (
                    <Card key={product._id} className="product-card">
                        <Link to={`/products/${product._id}`} className="product-link">
                            <img src={product.image.url} alt={product.alt} className="product-image" />
                            <div className="product-info">
                                <h5 className="product-title">{product.title}</h5>
                                <h6 className="product-subtitle">{product.subtitle}</h6>
                                <p className="product-description">{product.description}</p>
                            </div>
                        </Link>
                        <div className="size-selection">
                            <div className="size-buttons-container">
                                {product.variants.map(variant => (
                                    <button
                                        key={variant.size}
                                        className={`size-button ${selectedSizes[product._id] === variant.size ? 'selected' : ''}`}
                                        onClick={() => handleSizeSelect(product._id, variant.size)}
                                    >
                                        {variant.size}
                                    </button>
                                ))}
                            </div>
                            <p className="stock-status">
                                {selectedSizes[product._id] && product.variants.find(v => v.size === selectedSizes[product._id])?.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                            </p>
                        </div>
                        <AddToCartButton
                            productId={product._id}
                            variants={product.variants}
                            title={product.title}
                            image={product.image}
                            price={product.price} // הוסף את השדה price כאן
                        />
                    </Card>
                ))
            )}
        </div>
    );
};

export default Products;
