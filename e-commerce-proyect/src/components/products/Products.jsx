import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../productList/productList';

const Products = () => {
  const navigate = useNavigate();

  const handleSelectProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    
    <div className="container mx-auto p-4">
      <ProductList onSelectProduct={handleSelectProduct} />
    </div>
    
  );
};

export default Products;
