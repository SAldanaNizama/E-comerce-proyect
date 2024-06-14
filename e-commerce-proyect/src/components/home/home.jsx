import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <Carousel>
        <div>
          <img src="https://www.intel.la/content/dam/www/central-libraries/us/en/images/2022-08/rpl-desktop-chip-angle-3-white.png.rendition.intel.web.1648.927.png" alt="Imagen 1" />
          <p className="legend">Procesador</p>
        </div>
        <div>
          <img src="https://www.crucial.mx/content/dam/crucial/dram-products/laptop/images/web/crucial-ddr4-sodimm-kit-w-shadow-image.psd.transform/small-jpg/img.jpg" alt="Imagen 2" />
          <p className="legend">Memoria Ram</p>
        </div>
        <div>
          <img src="https://www.destreaming.es/wp-content/uploads/2020/11/pc_para_streaming_gaming.jpg" alt="Imagen 3" />
          <p className="legend">Pc Gamer</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;