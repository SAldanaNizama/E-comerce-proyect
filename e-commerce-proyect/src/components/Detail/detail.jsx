import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import LoadingSpinner from '../loading/loading';
import BackButton from '../backButton/BackButton'; // Importa tu botón aquí
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fallbackImage = '/wazaStore1.png'; 

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://e-commerce-test-hqul.onrender.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;
  }

  const images = product.images && product.images.length > 0 ? product.images : [{ imageUrl: fallbackImage }];

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: true, // Main carousel is infinite
    asNavFor: nav2,
  };

  const settingsThumbs = {
    slidesToShow: Math.min(4, images.length),
    slidesToScroll: 1,
    asNavFor: nav1,
    focusOnSelect: true,
    centerMode: true,
    infinite: false, // Thumbnail carousel is not infinite
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full flex flex-col items-start">
        <BackButton />
        <div className="flex w-full">
          <div className="w-1/2 pr-4">
            <Slider {...settingsMain} ref={(slider) => setNav1(slider)} className="slider-for">
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image.imageUrl} alt={`Product Image ${index + 1}`} className="w-full h-auto object-cover rounded-md" />
                </div>
              ))}
            </Slider>
            {images.length > 1 && (
              <Slider {...settingsThumbs} ref={(slider) => setNav2(slider)} className="slider-nav mt-4">
                {images.map((image, index) => (
                  <div key={index} className="p-1">
                    <img src={image.imageUrl} alt={`Product Thumbnail ${index + 1}`} className="w-full h-20 object-cover rounded-md" />
                  </div>
                ))}
              </Slider>
            )}
          </div>
          <div className="w-1/2 pl-4">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-semibold mb-4">{`$${product.price.toFixed(2)}`}</p>
            <div className="text-gray-700 mb-4">
              <p><strong>Stock:</strong> {product.stock} unidades disponibles</p>
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Fecha de Creación:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
