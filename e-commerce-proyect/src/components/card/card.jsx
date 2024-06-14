import React from 'react';

const ProductCard = ({ product, onSelect }) => {
  return (
    <div 
      className="border p-4 cursor-pointer" 
      onClick={() => onSelect(product.id)}
    >
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p className="text-lg font-semibold">{`$${product.price}`}</p>
    </div>
  );
};

export default ProductCard;
