import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container flex justify-rigth items-center mt-5">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-bar px-3 py-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 w-3/4 md:w-1/3"
      />
    </div>
  );
};

export default SearchBar;
