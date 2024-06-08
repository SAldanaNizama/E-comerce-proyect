import React, { useState } from 'react';
import ProductDetail from '../Detail/detail';
import ProductList from '../productList/productList';

const Home = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Productos</h1>
      <ProductList onSelectProduct={setSelectedProductId} />
      {selectedProductId && (
        <ProductDetail productId={selectedProductId} />
      )}
    </div>
  );
};

export default Home;
