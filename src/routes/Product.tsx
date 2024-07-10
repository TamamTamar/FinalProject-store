import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/product';
import { IProduct } from '../@Types/types';

const Product = () => {
    const { id } = useParams();
    const [product, setProducts] = useState<IProduct>();

    useEffect(() => {
        getProductById(id || "")
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err))
    }, [])



return (
    <div>{product?.title}</div>
)
}

export default Product