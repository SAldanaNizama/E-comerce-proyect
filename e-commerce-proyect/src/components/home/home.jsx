import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import LoadingSpinner from '../loading/loading';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const images = [
      "https://www.intel.la/content/dam/www/central-libraries/us/en/images/2022-08/rpl-desktop-chip-angle-3-white.png.rendition.intel.web.1648.927.png",
      "https://www.crucial.mx/content/dam/crucial/dram-products/laptop/images/web/crucial-ddr4-sodimm-kit-w-shadow-image.psd.transform/small-jpg/img.jpg",
      "https://www.destreaming.es/wp-content/uploads/2020/11/pc_para_streaming_gaming.jpg"
    ];
    
    const loadImages = images.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(loadImages)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
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
          <div>
            <img src="https://www.intel.la/content/dam/www/central-libraries/us/en/images/2022-08/rpl-desktop-chip-angle-3-white.png.rendition.intel.web.1648.927.png" alt="Imagen 1" />
            <p className="legend text-confianza-azulMarino">Procesador</p>
          </div>
          <div>
            <img src="https://www.crucial.mx/content/dam/crucial/dram-products/laptop/images/web/crucial-ddr4-sodimm-kit-w-shadow-image.psd.transform/small-jpg/img.jpg" alt="Imagen 2" />
            <p className="legend text-confianza-azulMarino">Memoria Ram</p>
          </div>
          <div>
            <img src="https://www.destreaming.es/wp-content/uploads/2020/11/pc_para_streaming_gaming.jpg" alt="Imagen 3" />
            <p className="legend text-confianza-azulMarino">Pc Gamer</p>
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default Home;