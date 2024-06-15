import React from 'react';

const SortBar = ({ sortOption, onSortChange }) => {
  return (
    <div className="sort-bar mb-4">
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" value={sortOption} onChange={e => onSortChange(e.target.value)}>
        <option value="">Select</option>
        <option value="nameAsc">Name (A-Z)</option>
        <option value="nameDesc">Name (Z-A)</option>
        <option value="priceAsc">Price (Low to High)</option>
        <option value="priceDesc">Price (High to Low)</option>
      </select>
    </div>
  );
};

export default SortBar;