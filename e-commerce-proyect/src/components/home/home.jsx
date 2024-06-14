import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleViewProducts = () => {
    navigate('/products');
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleViewProducts}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        View Products
      </button>
    </div>
  );
};

export default Home;