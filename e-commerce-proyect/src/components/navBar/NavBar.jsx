import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../login/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

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

          {/* Solo mostrar el enlace "Create products" a usuarios con rol "admin" */}
          {user && user.roles.some((role) => role.name === "ROLE_ADMIN") && (
            <Link
              to="/form"
              className="text-transmitir-blanco text-xl font-bold hover:text-futurista-negro"
            >
              Create products
            </Link>
          )}

          <Link
            to="/cart"
            className="text-transmitir-blanco text-xl font-bold hover:text-futurista-negro"
          >
            Cart
          </Link>
          {user ? (
            <Link
              to="/profile"
              className="text-transmitir-blanco text-xl font-bold hover:text-futurista-negro"
            >
              Profile
            </Link>
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
