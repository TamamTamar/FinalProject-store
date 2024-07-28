import { useState, useEffect, FC } from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import './Products.scss';
import { IProduct } from '../@Types/productType';
import { useSearch } from '../hooks/useSearch';
import { getAllProducts } from '../services/product-service';
import cartService from '../services/cart-service';
import AddToCartButton from '../components/AddToCartButton/AddToCartButton';

const Products: FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { searchTerm } = useSearch();
    const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: { id: string, size: string, price: number, quantity: number } }>({});

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

    const handleVariantSelect = (productId: string, variant: { id: string, size: string, price: number, quantity: number }) => {
        setSelectedVariants(prevVariants => ({
            ...prevVariants,
            [productId]: variant,
        }));
    };

    const handleAddToCart = async (productId: string) => {
        const variant = selectedVariants[productId];
        if (!variant) {
            alert('Please select a size.');
            return;
        }
        try {
            await cartService.addProductToCart(productId, variant.id, 1, variant.size);
            alert('Product added to cart!');
        } catch (error) {
            console.error('Failed to add product to cart.', error);
            alert('Failed to add product to cart.');
        }
    };

    return (
        <div className="product-list-container">
            {filteredProducts.length === 0 ? (
                <p>No products found</p>
            ) : (
                filteredProducts.map(product => (
                    <Card key={product._id} className="product-card">
                        <Link to={`/products/${product._id}`}>
                            <img src={product.image.url} alt={product.alt} className="w-full h-48 object-cover rounded-t-lg" />
                            <h5 className="text-xl font-bold">{product.title}</h5>
                            <h6 className="text-md font-semibold">{product.subtitle}</h6>
                            <p>{product.description}</p>
                            <div className="price-container">
                                <span className="original-price" style={{ marginRight: '10px' }}>
                                    ${(selectedVariants[product._id]?.price * 1.2).toFixed(2)}
                                </span>
                                <span className="discounted-price">
                                    ${selectedVariants[product._id]?.price.toFixed(2)}
                                </span>
                            </div>

                            <div className="size-buttons-container">
                                {product.variants.map(variant => (
                                    <button
                                        key={variant.size}
                                        className={`size-button ${selectedVariants[product._id]?.size === variant.size ? 'selected' : ''}`}
                                        onClick={() => handleVariantSelect(product._id, { ...variant, id: variant._id })}
                                    >
                                        {variant.size}
                                    </button>
                                ))}
                            </div>
                            <p>{selectedVariants[product._id]?.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
                        </Link>
                        <AddToCartButton
                            productId={product._id}
                            variantId={selectedVariants[product._id]?.id}
                            title={product.title}
                            price={selectedVariants[product._id]?.price}
                            image={product.image.url}
                            size={selectedVariants[product._id]?.size}
                            onAdd={async () => handleAddToCart(product._id)}
                        />
                    </Card>
                ))
            )}
        </div>
    );
};

export default Products;
