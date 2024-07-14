import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/product'; // Make sure these functions exist in your product service
import { IProduct } from '../@Types/types';

const UpdateProduct = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then(res => setProduct(res.data))
                .catch(err => setError(err));
        }
    }, [id]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prevProduct => prevProduct ? { ...prevProduct, [name]: value } : null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (product) {
            updateProduct(product._id, product)
                .then(() => navigate('/admin/products'))
                .catch(err => setError(err));
        }
    };

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Edit Product</h2>
            {product ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" value={product.title} onChange={handleInputChange} />
                    </label>
                    <label>
                        Subtitle:
                        <input type="text" name="subtitle" value={product.subtitle} onChange={handleInputChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" value={product.description} onChange={handleInputChange} />
                    </label>
                    <label>
                        Price:
                        <input type="number" name="price" value={product.price} onChange={handleInputChange} />
                    </label>
                    <label>
                        Size:
                        <input type="text" name="size" value={product.size} onChange={handleInputChange} />
                    </label>
                    <label>
                        Quantity:
                        <input type="number" name="quantity" value={product.quantity} onChange={handleInputChange} />
                    </label>
                    <button type="submit">Save</button>
                </form>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default UpdateProduct;
