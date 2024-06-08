import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../card/card';

const ProductList = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        setError(error);
        console.error('There has been a problem with your axios operation:', error);
      });
  }, []);

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error loading products: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
      ))}
    </div>
  );
};

export default ProductList;
