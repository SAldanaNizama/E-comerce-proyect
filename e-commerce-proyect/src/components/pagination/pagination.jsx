import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 mx-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
        >
          {'<'} 
        </button>
      )}
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 mx-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
        >
          {number}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 mx-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
        >
         {'>'}
        </button>
      )}
    </div>
  );
};

export default Pagination;
