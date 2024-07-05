import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-futurista-negro text-futurista-azulNeon rounded-lg shadow m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center">
          © 2023 <a href="https://flowbite.com/" className="hover:underline text-futurista-azulNeon">Flowbite™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
          <li>
            <Link to="/about" className="mr-4 hover:underline md:mr-6 text-futurista-azulNeon">
            About
          </Link>
          </li>
          <li>
            <Link to="/suport" className="mr-4 hover:underline md:mr-6 text-futurista-azulNeon">Suport</Link>
          </li>
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6 text-futurista-azulNeon">Terms of Service</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;