import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../loading/loading';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className='margin-top'>
    <div className="container mx-auto p-4 bg-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center mt-8">Top Viewed Products</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Slider {...settings} className="mt-8">
          {topViewedProducts.map((product, index) => {
            const productImage = product.images.length > 0 ? product.images[0].imageUrl : defaultImage;
            return (
              <div key={index} className="p-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <a href={`/product/${product.productId}`}>
                    <img src={productImage} alt={`Product ${index + 1}`} className="w-full h-64 object-cover" />
                  </a>
                  <div className="p-4">
                    <a href={`/product/${product.productId}`} className="block text-lg font-semibold text-gray-800 mb-2 hover:text-blue-500">{product.name}</a>
                    <p className="text-gray-600">${product.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      )}
        </div>
    </div>
  );
};

export default Home;
  