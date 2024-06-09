import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../card/card';
import LoadingSpinner from '../loading/loading';
import Pagination from '../pagination/pagination';
import SearchBar from '../searchBar/searchBar';

const ProductList = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    axios.get('/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.error('There has been a problem with your axios operation:', error);
      });
  }, []);

  const handleSearchChange = (value) => {
    setSearchTerm(value); 
    setCurrentPage(1); 
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
      
      {searchError ? (
        <div className="text-center mt-4 flex items-center justify-center">
          <div className="max-w-full md:max-w-xl lg:max-w-2xl flex items-center">
            <img src="/noSeEncontro.jpg" alt="No se encontraron productos" className="max-w-1/2 h-auto mb-4 mr-4" />
            <p className="text-xl font-bold">NO SE ENCONTRO NI MIERDA</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
