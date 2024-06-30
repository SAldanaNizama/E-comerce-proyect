import React from 'react';

const Pagination = ({ currentPage, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 border rounded-md bg-gray-300"
      >
        Previous
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-1 mx-1 border rounded-md bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
