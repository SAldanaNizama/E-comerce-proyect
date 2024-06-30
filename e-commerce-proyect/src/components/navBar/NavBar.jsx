import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // const logo = '/wazaStore.png'; 
  return (
    <nav className="bg-futurista-azulNeon p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          {/* <img src={logo} alt="Waza Stores" className="h-13 max-h-14 w-auto cursor-pointer" /> */}
          <div className="text-transmitir-blanco text-2xl font-bold">
          Waza Stores
        </div>
        </Link>
        <div className="flex space-x-5">
          <Link to="/" className="text-transmitir-blanco text-xl hover:text-futurista-negro">
            Home
          </Link>
          <Link to="/products" className="text-transmitir-blanco text-xl hover:text-futurista-negro">
            Products
          </Link>
          <Link to="/login" className="text-transmitir-blanco text-xl hover:text-futurista-negro">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
