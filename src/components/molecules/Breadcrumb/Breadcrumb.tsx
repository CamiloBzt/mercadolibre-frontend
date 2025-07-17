import Link from 'next/link';
import React from 'react';
import styles from './Breadcrumb.module.scss';
import { BreadcrumbProps } from './Breadcrumb.types';

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  categories,
  className = '',
}) => {
  return (
    <nav
      className={`${styles.breadcrumb} ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className={styles.breadcrumb__list}>
        <li className={styles.breadcrumb__item}>
          <Link href="/" className={styles.breadcrumb__link}>
            Volver al listado
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
