import React from 'react';
import ProductList from '../ProductList/ProductList';
import styles from './SearchResults.module.scss';
import { SearchResultsProps } from './SearchResults.types';

const SearchResults: React.FC<SearchResultsProps> = ({
  products,
  isLoading = false,
  onProductClick,
  className = '',
}) => {
  return (
    <section className={`${styles.searchresults} ${className}`}>
      <div className={styles.searchresults__container}>
        <div className={styles.searchresults__content}>
          <ProductList
            products={products}
            isLoading={isLoading}
            onProductClick={onProductClick}
          />
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
