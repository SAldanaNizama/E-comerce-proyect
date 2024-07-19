import React, { useState, useEffect } from "react";
import axios from "axios";

const FilterBar = ({ onFilterChange }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
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
          axios.get("https://e-commerce-test-hqul.onrender.com/marcas"),
          axios.get("https://e-commerce-test-hqul.onrender.com/subcategories"),
        ]);
        setMarcas(marcasResponse.data);
        setSubcategorias(subcategoriasResponse.data);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filters = {
      brands: selectedBrands,
      subcategories: selectedSubcategories,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    };
    onFilterChange(filters);
  }, [selectedBrands, selectedSubcategories, minPrice, maxPrice]);

  const handleBrandChange = (name) => {
    setSelectedBrands((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const handleSubcategoryChange = (name) => {
    setSelectedSubcategories((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const handleClearFilters = () => {
    setSelectedBrands([]);
    setSelectedSubcategories([]);
    setMinPrice("");
    setMaxPrice("");
    onFilterChange({
      brands: [],
      subcategories: [],
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="relative z-50">
      <button
        className="md:hidden p-2 bg-indigo-600 text-white rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close Filters" : "Open Filters"}
      </button>
      <div
        className={`fixed inset-0 w-64 bg-white shadow-lg p-4 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Filter by Brand:
          </label>
          {marcas.map((marca) => (
            <div key={marca.marcaId} className="mt-2">
              <input
                type="checkbox"
                id={`brand-${marca.marcaId}`}
                name="brand"
                value={marca.name}
                checked={selectedBrands.includes(marca.name)}
                onChange={() => handleBrandChange(marca.name)}
                className="mr-2"
              />
              <label htmlFor={`brand-${marca.marcaId}`}>{marca.name}</label>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Filter by Subcategory:
          </label>
          {subcategorias.map((subcategoria) => (
            <div key={subcategoria.subcategoryId} className="mt-2">
              <input
                type="checkbox"
                id={`subcategory-${subcategoria.subcategoryId}`}
                name="subcategory"
                value={subcategoria.name}
                checked={selectedSubcategories.includes(subcategoria.name)}
                onChange={() => handleSubcategoryChange(subcategoria.name)}
                className="mr-2"
              />
              <label htmlFor={`subcategory-${subcategoria.subcategoryId}`}>
                {subcategoria.name}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Min Price:
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Max Price:
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mt-4 flex justify-between">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
