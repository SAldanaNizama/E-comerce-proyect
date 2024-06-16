import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterBar = ({ onFilterChange }) => {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterValue, setFilterValue] = useState('');

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
    if (filterValue) {
      onFilterChange({ type: 'marca', value: filterValue });
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
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      >
        <option value="">Select a brand</option>
        {marcas.map(marca => (
          <option key={marca.marcaId} value={marca.marcaId}>{marca.name}</option>
        ))}
      </select>
      <button onClick={handleFilterChange}>Apply Filter</button>
    </div>
  );
};

export default FilterBar;