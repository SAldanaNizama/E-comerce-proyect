import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

const ProductCard = ({ product }) => {
  const fallbackImageUrl = '/computadora.jpg'; 

  const images = product.images && product.images.length > 0 ? product.images : [{ imageUrl: fallbackImageUrl }];

  return (
    <Link to={`/product/${product.productId}`} className="block transform transition-transform duration-200 ease-in-out hover:scale-105">
      <div className="bg-transmitir-blanco rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-200 ease-in-out">
        <Carousel 
          showThumbs={false} 
          showStatus={false} 
          infiniteLoop 
          autoPlay 
          interval={3000} 
          stopOnHover={false} 
          showIndicators={false}
          showArrows={false}
        >
          {images.map((image, index) => (
            <div key={index}>
              <img src={image.imageUrl} alt={`${product.name} ${index + 1}`} className="w-full h-48 object-cover rounded-md mb-4" />
            </div>
          ))}
        </Carousel>
        <h2 className="text-xl font-bold text-futurista-azulNeon mb-2">{product.name}</h2>
        <p className="text-lg text-confianza-azulMarino mb-2">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
