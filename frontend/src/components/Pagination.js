import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Return null if there's only one page
  if (totalPages <= 1) return null;
  
  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first and last pages, plus 1 before and after current page
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - 1 && i <= currentPage + 1) // Pages around current page
      ) {
        pageNumbers.push(i);
      } else if (
        (i === currentPage - 2 && currentPage > 3) || // Ellipsis before
        (i === currentPage + 2 && currentPage < totalPages - 2) // Ellipsis after
      ) {
        pageNumbers.push('...');
      }
    }
    
    // Remove duplicates
    return pageNumbers.filter((num, idx, arr) => arr.indexOf(num) === idx);
  };
  
  return (
    <nav aria-label="Blog pagination">
      <ul className="pagination justify-content-center">
        {/* Previous button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        
        {/* Page numbers */}
        {getPageNumbers().map((num, index) => (
          <li 
            key={index} 
            className={`page-item ${num === currentPage ? 'active' : ''} ${num === '...' ? 'disabled' : ''}`}
          >
            <button 
              className="page-link"
              onClick={() => num !== '...' && onPageChange(num)}
              disabled={num === '...'}
            >
              {num}
            </button>
          </li>
        ))}
        
        {/* Next button */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination; 