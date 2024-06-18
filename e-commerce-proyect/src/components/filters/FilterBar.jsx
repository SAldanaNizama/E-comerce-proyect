import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterBar = ({ onFilterChange }) => {
  const [filterOption, setFilterOption] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
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

    axios.get('https://node187822-ecommerce.jelastic.saveincloud.net:13916/subcategories')
      .then(response => {
        setSubcategorias(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.error('Error fetching subcategories:', error);
      });
  }, []);

  const handleFilterChange = () => {
    if (filterOption && filterValue) {
      onFilterChange({ type: filterOption, value: filterValue });
    } else if (filterOption === 'all') {
      onFilterChange({ type: 'all' });
    }
  };

  if (loading) {
    return <div>Loading brands and subcategories...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="filter-bar mb-4">
      <label htmlFor="filter">Filter by: </label>
      <select
        value={filterOption}
        onChange={(e) => {
          setFilterOption(e.target.value);
          setFilterValue(''); // Reset filter value when changing filter option
        }}
      >
        <option value="all">All</option>
        <option value="brand">Brand</option>
        <option value="subcategory">Subcategory</option>
      </select>

      {filterOption === 'brand' && (
        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="">Select a brand</option>
          {marcas.map(marca => (
            <option key={marca.marcaId} value={marca.marcaId}>{marca.name}</option>
          ))}
        </select>
      )}

      {filterOption === 'subcategory' && (
        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="">Select a subcategory</option>
          {subcategorias.map(subcategoria => (
            <option key={subcategoria.subcategoryId} value={subcategoria.subcategoryId}>{subcategoria.name}</option>
          ))}
        </select>
      )}

      <button onClick={handleFilterChange}>Apply Filter</button>
    </div>
  );
};

export default FilterBar;