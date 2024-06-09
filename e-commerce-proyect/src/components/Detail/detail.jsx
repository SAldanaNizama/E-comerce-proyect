import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../loading/loading';
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://node187822-ecommerce.jelastic.saveincloud.net:13916/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <LoadingSpinner/>
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <p>{product.description}</p>
      <p className="text-lg font-semibold">{`$${product.price}`}</p>
      <p><strong>Stock:</strong> {product.stock} unidades disponibles</p>
      <p><strong>SKU:</strong> {product.sku}</p>
      <p><strong>Fecha de Creación:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ProductDetail;
