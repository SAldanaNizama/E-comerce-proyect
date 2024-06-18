import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-futurista-azulNeon p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-transmitir-blanco text-lg font-bold">
          Waza Stores
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-transmitir-blanco hover:text-futurista-negro">
            Home
          </Link>
          <Link to="/products" className="text-transmitir-blanco hover:text-futurista-negro">
            Products
          </Link>
          {/* <Link to="/login" className="text-transmitir-blanco hover:text-transmitir-opcional">
            Login
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;