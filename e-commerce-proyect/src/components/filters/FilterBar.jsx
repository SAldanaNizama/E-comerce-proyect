import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterBar = ({ onFilterChange }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
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
    const filters = {
      brands: selectedBrand ? [selectedBrand] : [],
      subcategories: selectedSubcategory ? [selectedSubcategory] : [],
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined
    };
    onFilterChange(filters);
  };

  if (loading) {
    return <div>Loading brands and subcategories...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="filter-bar mb-4">
      <div>
        <label htmlFor="brand-filter">Filter by Brand: </label>
        <select
          id="brand-filter"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">Select a brand</option>
          {marcas.map(marca => (
            <option key={marca.marcaId} value={marca.marcaId}>{marca.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="subcategory-filter">Filter by Subcategory: </label>
        <select
          id="subcategory-filter"
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
        >
          <option value="">Select a subcategory</option>
          {subcategorias.map(subcategoria => (
            <option key={subcategoria.subcategoryId} value={subcategoria.subcategoryId}>{subcategoria.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="min-price-filter">Min Price: </label>
        <input
          type="number"
          id="min-price-filter"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min Price"
        />
      </div>

      <div>
        <label htmlFor="max-price-filter">Max Price: </label>
        <input
          type="number"
          id="max-price-filter"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
        />
      </div>

      <button onClick={handleFilterChange}>Apply Filter</button>
    </div>
  );
};

export default FilterBar;
