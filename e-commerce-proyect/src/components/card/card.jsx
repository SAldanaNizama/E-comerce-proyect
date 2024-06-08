import React from 'react';

const ProductCard = ({ product, onSelect }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => onSelect(product.id)}>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-gray-700 font-semibold">Price: ${product.price}</p>
          <p className="text-gray-600">Stock: {product.stock}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
