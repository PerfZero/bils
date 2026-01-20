import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="a-pagination">
      <span className="a-pagination__button">
        <svg className="a-svg a-pagination__icon a-pagination__icon--prev">
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon-old-arrow"></use>
        </svg>
      </span>
      
      <ul className="a-pagination__list">
        {getVisiblePages().map((page, index) => (
          <li key={index} className="a-pagination__item">
            {page === '...' ? (
              <span className="a-pagination__button">...</span>
            ) : (
              <a
                href={`/about/novosti/?page=${page}`}
                className={`a-pagination__button nuxt-link-active ${page === currentPage ? 'a-pagination__item--active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </a>
            )}
          </li>
        ))}
      </ul>
      
      <a href={`/about/novosti/?page=${currentPage + 1}`} className="a-pagination__button nuxt-link-active">
        <svg className="a-svg a-pagination__icon a-pagination__icon--next">
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon-old-arrow"></use>
        </svg>
      </a>
    </div>
  );
};

export default Pagination;
