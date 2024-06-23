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
  const [filterOptions, setFilterOptions] = useState({ brands: [], subcategories: [] });

  const fetchProducts = async () => {
    setLoading(true);
    let url = 'https://e-commerce-test-hqul.onrender.com/products';
    if (filterOptions.brands.length > 0 || filterOptions.subcategories.length > 0) {
      const brandParams = filterOptions.brands.length > 0 ? `brands=${filterOptions.brands.join(',')}` : '';
      const subcategoryParams = filterOptions.subcategories.length > 0 ? `subcategories=${filterOptions.subcategories.join(',')}` : '';
      url += `?${brandParams}&${subcategoryParams}`;
    }

    try {
      const response = await axios.get(url);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error('There has been a problem with your axios operation:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filterOptions]);

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
    <div>
      <div className="mb-4">
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>
      <div className="mb-4">
        <SortBar sortOption={sortOption} onSortChange={handleSortChange} />
      </div>
      <div className="mb-4">
        <FilterBar onFilterChange={handleFilterChange} />
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
  );
};

export default ProductList;