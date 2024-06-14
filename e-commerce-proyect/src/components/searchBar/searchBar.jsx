import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container flex justify-center items-center mt-4">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-bar px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
