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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div>
      <button
        className="md:hidden p-2 bg-indigo-600 text-white rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        Toggle Filters
      </button>
      <div className={`fixed inset-0 w-64 bg-white shadow-lg p-4 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300`}>
        <div>
          <label htmlFor="brand-filter" className="block text-sm font-medium text-gray-700">Filter by Brand:</label>
          <select
            id="brand-filter"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select a brand</option>
            {marcas.map(marca => (
              <option key={marca.marcaId} value={marca.name}>{marca.name}</option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="subcategory-filter" className="block text-sm font-medium text-gray-700">Filter by Subcategory:</label>
          <select
            id="subcategory-filter"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select a subcategory</option>
            {subcategorias.map(subcategoria => (
              <option key={subcategoria.subcategoryId} value={subcategoria.name}>{subcategoria.name}</option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="min-price-filter" className="block text-sm font-medium text-gray-700">Min Price:</label>
          <input
            type="number"
            id="min-price-filter"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            placeholder="Min Price"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="max-price-filter" className="block text-sm font-medium text-gray-700">Max Price:</label>
          <input
            type="number"
            id="max-price-filter"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            placeholder="Max Price"
          />
        </div>

        <button onClick={handleFilterChange} className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
