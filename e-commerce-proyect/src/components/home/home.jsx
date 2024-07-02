import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../loading/loading';


const defaultImage = './wazaStore.png';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topViewedProducts, setTopViewedProducts] = useState([]);

  useEffect(() => {
    const fetchTopViewedProducts = async () => {
      try {
        const response = await axios.get('https://e-commerce-test-hqul.onrender.com/products/top-views');
        setTopViewedProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching top viewed products:', error);
        setIsLoading(false);
      }
    };

    fetchTopViewedProducts();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top Viewed Products</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topViewedProducts.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <a href={`/product/${product.productId}`}>
                <img src={product.imageUrl || defaultImage} alt={`Product ${index + 1}`} className="w-full h-64 object-cover" />
              </a>
              <div className="p-4">
                <a href={`/product/${product.productId}`} className="block text-lg font-semibold text-gray-800 mb-2 hover:text-blue-500">{product.name}</a>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
