import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterBar = ({ onFilterChange }) => {
  const [filterOption, setFilterOption] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://node187822-ecommerce.jelastic.saveincloud.net:13916/marcas')
      .then(response => {
        setMarcas(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.error('Error fetching brands:', error);
      });
  }, []);

  const handleFilterChange = () => {
  if (filterOption && filterValue) {
    onFilterChange({ type: filterOption, value: filterValue });
  }
};

  if (loading) {
    return <div>Loading brands...</div>;
  }

  if (error) {
    return <div>Error loading brands: {error.message}</div>;
  }

  return (
    <div className="filter-bar mb-4">
      <label htmlFor="filter">Filter by: </label>
      <select
        id="filter"
        value={filterOption}
        onChange={(e) => setFilterOption(e.target.value)}
      >
        <option value="">Select</option>
        <option value="subcategory">Subcategory</option>
        <option value="brand">Brand</option>
      </select>
      {filterOption === 'brand' && (
        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="">Select a brand</option>
          {marcas.map(marca => (
            <option key={marca.marcaId} value={marca.name}>{marca.name}</option>
          ))}
        </select>
      )}
      <button onClick={handleFilterChange}>Apply Filter</button>
    </div>
  );
};

export default FilterBar;