import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const fallbackImageUrl = '/computadora.jpg'; // Reemplaza con la ruta a tu imagen de respaldo
  const imageUrl = product.images && product.images.length > 0 ? product.images[0].imageUrl : fallbackImageUrl;

  return (
    <Link to={`/product/${product.productId}`} className="block transform transition-transform duration-200 ease-in-out hover:scale-105">
      <div className="bg-transmitir-blanco rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-200 ease-in-out">
        <img src={imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
        <h2 className="text-xl font-bold text-futurista-azulNeon mb-2">{product.name}</h2>
        <p className="text-lg text-confianza-azulMarino mb-2">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
