import { useAppSelector } from '@/hooks/redux';
import { selectSearchState } from '@/store/slices/searchSlice';
import Link from 'next/link';
import React from 'react';
import styles from './Breadcrumb.module.scss';
import { BreadcrumbProps } from './Breadcrumb.types';

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  categories,
  className = '',
}) => {
  const searchState = useAppSelector(selectSearchState);
  const { query, currentPage } = searchState;

  const getBackUrl = () => {
    if (query && query.trim()) {
      const params = new URLSearchParams();
      params.set('search', query.trim());
      if (currentPage && currentPage > 1) {
        params.set('page', currentPage.toString());
      }
      return `/items?${params.toString()}`;
    }
    return '/';
  };

  const getBackText = () => {
    return query && query.trim() ? 'Volver al listado' : 'Volver al inicio';
  };

  return (
    <nav
      className={`${styles.breadcrumb} ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className={styles.breadcrumb__list}>
        <li className={styles.breadcrumb__item}>
          <Link href={getBackUrl()} className={styles.breadcrumb__link}>
            {getBackText()}
          </Link>
        </li>
        {categories.map((category, index) => (
          <li key={index} className={styles.breadcrumb__item}>
            {index === 0 ? (
              <span className={styles.breadcrumb__separator}>{'|'}</span>
            ) : (
              <span className={styles.breadcrumb__separator}>{'>'}</span>
            )}
            <span className={styles.breadcrumb__text}>{category}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
