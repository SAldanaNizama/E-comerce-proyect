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
    const fetchData = async () => {
      setLoading(true);
      try {
        const [marcasResponse, subcategoriasResponse] = await Promise.all([
          axios.get('https://e-commerce-test-hqul.onrender.com/marcas'),
          axios.get('https://e-commerce-test-hqul.onrender.com/subcategories')
        ]);
        setMarcas(marcasResponse.data);
        setSubcategorias(subcategoriasResponse.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = () => {
    if (filterOption === 'brand' && filterValue) {
      onFilterChange({ brands: [filterValue], subcategories: [] });
    } else if (filterOption === 'subcategory' && filterValue) {
      onFilterChange({ brands: [], subcategories: [filterValue] });
    } else {
      onFilterChange({ brands: [], subcategories: [] });
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
        <option value="">Select filter option</option>
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
