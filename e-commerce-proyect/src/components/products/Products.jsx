import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../productList/productList';

const Home = () => {
  const navigate = useNavigate();

  const handleSelectProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Productos</h1>
      <ProductList onSelectProduct={handleSelectProduct} />
    </div>
    
  );
};

export default Home;
