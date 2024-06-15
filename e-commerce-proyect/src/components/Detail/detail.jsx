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
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4 text-center">{product.name}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-lg font-semibold mb-4 text-center">{`$${product.price.toFixed(2)}`}</p>
        <div className="text-gray-700 mb-4">
          <p><strong>Stock:</strong> {product.stock} unidades disponibles</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Fecha de Creación:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;