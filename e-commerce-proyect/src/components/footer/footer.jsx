import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-futurista-negro text-white shadow w-full">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center">
          © 2023 <a href="https://flowbite.com/" className="hover:underline text-white">Flowbite™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
          <li>
            <Link to="/about" className="mr-4 hover:underline md:mr-6 text-white">
              About
            </Link>
          </li>
          <li>
            <Link to="/support" className="mr-4 hover:underline md:mr-6 text-white">Support</Link>
          </li>
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6 text-white">Terms of Service</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
