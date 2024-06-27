import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../card/card';
import LoadingSpinner from '../loading/loading';
import Pagination from '../pagination/pagination';
import SearchBar from '../searchBar/searchBar';
import SortBar from "../sortBar/SortBar";
import FilterBar from '../filters/FilterBar';

const ProductList = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [filterOptions, setFilterOptions] = useState({ brands: [], subcategories: [], minPrice: '', maxPrice: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    let url = 'https://e-commerce-test-hqul.onrender.com/products/filter?';

    if (filterOptions.brands.length > 0) {
      url += `marcaName=${filterOptions.brands[0]}&`;
    }
    if (filterOptions.subcategories.length > 0) {
      url += `subcategoryName=${filterOptions.subcategories[0]}&`;
    }
    if (filterOptions.minPrice) {
      url += `minPrice=${filterOptions.minPrice}&`;
    }
    if (filterOptions.maxPrice) {
      url += `maxPrice=${filterOptions.maxPrice}&`;
    }

    // Remove trailing '&' or '?' if any
    url = url.slice(-1) === '&' || url.slice(-1) === '?' ? url.slice(0, -1) : url;

    try {
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleFilterChange = (filters) => {
    setFilterOptions(filters);
  };

  const sortProducts = (products) => {
    switch (sortOption) {
      case 'nameAsc':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'nameDesc':
        return products.sort((a, b) => b.name.localeCompare(a.name));
      case 'priceAsc':
        return products.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = sortProducts(filteredProducts);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setSearchError(filteredProducts.length === 0);
  }, [filteredProducts]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error loading products: {error.message}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row md:space-x-4">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
        </svg>
      </button>

      <div className={`fixed inset-0 z-40 transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      <div className="flex-grow p-4">
        <div className="mb-4">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </div>
        <div className="mb-4">
          <SortBar sortOption={sortOption} onSortChange={handleSortChange} />
        </div>
        
        {searchError ? (
          <div className="text-center mt-4 flex items-center justify-center">
            <div className="max-w-full md:max-w-xl lg:max-w-2xl flex items-center">
              <img src="/noSeEncontro.png" alt="No se encontraron productos" className="max-w-1/2 h-auto mb-4 mr-4" />
              <p className="text-xl font-bold">Did not find the product you are looking for</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
            ))}
          </div>
        )}

        <div className="flex-grow">
          <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredProducts.length / productsPerPage)} onPageChange={paginate} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
