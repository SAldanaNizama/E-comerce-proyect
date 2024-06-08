import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/products/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There has been a problem with your axios operation:', error);
      });
  }, [productId]);

  if (!product) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <p><strong>Descripción:</strong> {product.description}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock} unidades disponibles</p>
      <p><strong>SKU:</strong> {product.sku}</p>
      <p><strong>Fecha de Creación:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default ProductDetail;
