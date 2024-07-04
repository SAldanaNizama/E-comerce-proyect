import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../loading/loading';
import BackButton from '../backButton/BackButton'; // Importa tu botón aquí

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fallbackImage = '/wazaStore1.png'; 

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://e-commerce-test-hqul.onrender.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;
  }

  const imageUrl = product.images && product.images.length > 0 ? product.images[0].imageUrl : fallbackImage;

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full flex flex-col items-start">
        <BackButton />
        <div className="flex w-full">
          <div className="w-1/2 pr-4">
            <img src={imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-md" />
          </div>
          <div className="w-1/2 pl-4">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-semibold mb-4">{`$${product.price.toFixed(2)}`}</p>
            <div className="text-gray-700 mb-4">
              <p><strong>Stock:</strong> {product.stock} unidades disponibles</p>
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Fecha de Creación:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
