import { FC, useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { IProduct, IVariant } from '../@Types/productType';
import { useSearch } from '../hooks/useSearch';
import './Products.scss';
import { getAllProducts } from '../services/product-service';
import AddToCartButton from '../components/AddToCartButton/AddToCartButton';
import dialogs from '../ui/dialogs';

const Products: FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { searchTerm } = useSearch();
    const navigate = useNavigate();
    const [selectedVariant, setSelectedVariant] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                setProducts(response.data);
                
                const initialSizes = response.data.reduce((acc: { [key: string]: string }, product: IProduct) => {
                    if (product.variants.length > 0) {
                        acc[product._id] = product.variants[0].size;
                    }
                    return acc;
                }, {});
                
                setSelectedVariant(initialSizes);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error);
                } else {
                    setError(new Error('שגיאה לא ידועה התרחשה'));
                }
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
                            <img src={product.image.url} alt={product.alt} className="w-full h-50 object-cover rounded-t-lg mb-2" />
                            <div className="product-info flex-1">
                                <h5 className="text-xl font-bold">{product.title}</h5>
                                <h6 className="text-md font-semibold">{product.subtitle}</h6>
                                <p>{product.description}</p>
                            </div>
                        </Link>

                        <AddToCartButton
                            productId={product._id}
                            variants={product.variants}
                            title={product.title}
                            image={product.image}
                            onNotLoggedIn={()=> navigate('/login')}
                        />
                    </Card>
                ))
            )}
        </div>
    );
};

export default Products;