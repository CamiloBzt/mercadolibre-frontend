import ProductCardSkeleton from '@/components/molecules/ProductCardSkeleton/ProductCardSkeleton';
import React from 'react';
import styles from './SearchResultsSkeleton.module.scss';
import { SearchResultsSkeletonProps } from './SearchResultsSkeleton.types';

const SearchResultsSkeleton: React.FC<SearchResultsSkeletonProps> = ({
  itemCount = 10,
  className = '',
}) => {
  return (
    <section className={`${styles.searchresultsskeleton} ${className}`}>
      <div className={styles.searchresultsskeleton__container}>
        <div className={styles.searchresultsskeleton__content}>
          {Array.from({ length: itemCount }).map((_, index) => (
            <div key={index} className={styles.searchresultsskeleton__item}>
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchResultsSkeleton;
