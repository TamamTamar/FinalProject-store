import { useState, useEffect, FC } from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import './Products.scss';
import { IProduct } from '../@Types/productType';
import { useSearch } from '../hooks/useSearch';
import { getAllProducts } from '../services/product-service';
import AddToCartButton from '../components/AddToCartButton/AddToCartButton';

const Products: FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { searchTerm } = useSearch();

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
                        <AddToCartButton
                            productId={product._id}
                            variants={product.variants}
                            title={product.title}
                            image={product.image.url}
                            onAdd={() => console.log('Product added to cart')}
                        />
                    </Card>
                ))
            )}
        </div>
    );
};

export default Products;
