import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
    <div className="container mx-auto p-4 bg-transmitir-blanco">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Carousel 
          autoPlay 
          infiniteLoop 
          showThumbs={false} 
          interval={3000} 
          showArrows={true}
          showStatus={false}
        >
          {topViewedProducts.map((product, index) => (
            <div key={index}>
              <a href={`/product/${product.productId}`}>
                <img src={product.imageUrl || defaultImage} alt={`Imagen ${index + 1}`} />
              </a>
              <p className="legend text-confianza-azulMarino">
                <a href={`/product/${product.productId}`}>{product.name}</a>
              </p>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Home;