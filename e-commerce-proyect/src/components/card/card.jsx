import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onSelect }) => {
  const randomImageUrl = `https://source.unsplash.com/random/300x300?product,${product.id}`;

  return (
    <div className="bg-transmitir-blanco rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-200 ease-in-out">
      <img src={randomImageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-bold text-futurista-azulNeon mb-2">{product.name}</h2>
      <p className="text-lg text-confianza-azulMarino mb-2">${product.price}</p>
      <Link to={`/product/${product.productId}`} className="bg-futurista-azulNeon text-transmitir-blanco px-4 py-2 rounded-lg hover:bg-futurista-negro transition-colors duration-200">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;