import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../login/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
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
          <Link
            to="/"
            className="text-transmitir-blanco text-xl font-bold hover:text-futurista-negro"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-transmitir-blanco text-xl font-bold hover:text-futurista-negro"
          >
            Products
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="text-transmitir-blanco text-xl font-bold hover:text-futurista-negro"
              >
                Profile
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="text-transmitir-blanco text-xl font-bold hover:text-futurista-negro"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
