import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductCard = ({ product }) => {
  const fallbackImageUrl = "/wazaStore.png";
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [{ imageUrl: fallbackImageUrl }];

  return (
    <Link
      to={`/product/${product.productId}`}
      className="block transform transition-transform duration-200 ease-in-out hover:scale-105"
    >
      <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-200 ease-in-out">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={3000}
          stopOnHover={false}
          showIndicators={false}
          showArrows={false}
          className="mb-4"
        >
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image.imageUrl}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          ))}
        </Carousel>
        <h2 className="text-xl font-bold text-blue-700 mb-2 truncate">
          {product.name}
        </h2>
        <p className="text-lg text-gray-800 mb-2">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
