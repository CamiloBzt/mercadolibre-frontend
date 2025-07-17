import React from 'react';
import { PaginationProps } from './Pagination.types';
import styles from './Pagination.module.scss';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();

  return (
    <nav
      className={`${styles.pagination} ${className}`}
      aria-label="Navegación de páginas"
    >
      <button
        className={`${styles.pagination__button} ${styles.pagination__button__prev} ${
          currentPage === 1 ? styles.pagination__button__disabled : ''
        }`}
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        <span className={styles.pagination__button__icon}>{'<'}</span>
        <span className={styles.pagination__button__label}>Anterior</span>
      </button>

      {visiblePages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className={styles.pagination__ellipsis}
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            className={`${styles.pagination__button} ${
              page === currentPage ? styles.pagination__button__active : ''
            }`}
            onClick={() => handlePageClick(page)}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        className={`${styles.pagination__button} ${styles.pagination__button__next} ${
          currentPage === totalPages ? styles.pagination__button__disabled : ''
        }`}
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
      >
        <span className={styles.pagination__button__label}>Siguiente</span>
        <span className={styles.pagination__button__icon}>{'>'}</span>
      </button>
    </nav>
  );
};

export default Pagination;
