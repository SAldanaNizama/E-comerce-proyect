import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../card/card";
import LoadingSpinner from "../loading/loading";
const Cards = ({ searchTerm, filters, currentPage, productsPerPage, sortOption }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        let url = "https://e-commerce-test-hqul.onrender.com/products/filter?";

        const params = new URLSearchParams();
        
        if (filters.brands && filters.brands.length > 0) {
          params.append("marcaName", filters.brands.join(","));
        }
        
        if (filters.subcategories && filters.subcategories.length > 0) {
          params.append("subcategoryName", filters.subcategories.map(subcat => subcat.name).join(","));
        }
        
        if (filters.minPrice !== undefined) {
          params.append("minPrice", filters.minPrice.toString());
        }
        
        if (filters.maxPrice !== undefined) {
          params.append("maxPrice", filters.maxPrice.toString());
        }
        
        const response = await axios.get(`${url}${params.toString()}`);
        let products = response.data;

        if (searchTerm) {
          products = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (sortOption) {
          products.sort((a, b) => {
            if (sortOption === "nameAsc") return a.name.localeCompare(b.name);
            if (sortOption === "nameDesc") return b.name.localeCompare(a.name);
            if (sortOption === "priceAsc") return a.price - b.price;
            if (sortOption === "priceDesc") return b.price - a.price;
            return 0;
          });
        }

        setFilteredProducts(products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [filters, searchTerm, sortOption]);

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {currentProducts.length > 0 ? (
        currentProducts.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))
      ) : (
        <div>No products match the selected filters.</div>
      )}
    </div>
  );
};

export default Cards;
