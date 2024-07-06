import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está autenticado

  const handleLogout = () => {
    // Aquí manejarías la lógica de cierre de sesión si es necesario
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-futurista-azulNeon p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="text-transmitir-blanco text-2xl font-extrabold">
            Waza Stores
          </div>
        </Link>
        <div className="flex space-x-5">
          <Link to="/" className="text-transmitir-blanco text-xl font-bold hover:text-futurista-negro">
            Home
          </Link>
          <Link to="/products" className="text-transmitir-blanco text-xl font-bold hover:text-futurista-negro">
            Products
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-transmitir-blanco text-xl font-bold hover:text-futurista-negro">
                User
              </Link>
              <button
                onClick={handleLogout}
                className="text-transmitir-blanco text-xl font-bold hover:text-futurista-negro"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-transmitir-blanco text-xl font-bold hover:text-futurista-negro">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
