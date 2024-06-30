import React, { useState, useEffect } from 'react';
import Cards from '../cards/cards';
import Pagination from '../pagination/pagination';
import SearchBar from '../searchBar/searchBar';
import SortBar from "../sortBar/SortBar";
import FilterBar from '../filters/FilterBar';

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    brands: [],
    subcategories: [],
    minPrice: undefined,
    maxPrice: undefined
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [sortOption, setSortOption] = useState("");

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleFilterChange = (filters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="fixed inset-0 z-40 transition-transform duration-300 md:relative md:translate-x-0">
        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      <div className="flex-grow p-4">
        <div className="mb-4">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </div>

        <div className="mb-4">
          <SortBar sortOption={sortOption} onSortChange={handleSortChange} />
        </div>

        <Cards 
          searchTerm={searchTerm}
          filters={appliedFilters}
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          sortOption={sortOption}
          onSelectProduct={handleProductSelect}
        />

        <Pagination 
          currentPage={currentPage}
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
};

export default ProductList;
