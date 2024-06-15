import React from 'react';

const FilterBar = ({ filterOption, onFilterChange }) => {
  const handleInputChange = (e) => {
    onFilterChange({ type: filterOption, value: e.target.value });
  };

  return (
    <div className="filter-bar mb-4">
      <label htmlFor="filter">Filter by: </label>
      <select id="filter" value={filterOption} onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">Select</option>
        <option value="subcategory">Subcategory</option>
        <option value="brand">Brand</option>
      </select>
      {filterOption === 'subcategory' && (
        <input 
          type="text" 
          placeholder="Enter subcategory name" 
          onChange={handleInputChange} 
        />
      )}
      {filterOption === 'brand' && (
        <input 
          type="text" 
          placeholder="Enter brand ID" 
          onChange={handleInputChange} 
        />
      )}
    </div>
  );
};

export default FilterBar;