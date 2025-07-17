import Skeleton from '@/components/atoms/Skeleton/Skeleton';
import React from 'react';
import styles from './ProductCardSkeleton.module.scss';
import { ProductCardSkeletonProps } from './ProductCardSkeleton.types';

const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({
  className = '',
}) => {
  return (
    <div className={`${styles.productcardskeleton} ${className}`}>
      <div className={styles.productcardskeleton__image}>
        <Skeleton
          variant="image"
          width="100%"
          height="100%"
          className={styles.productcardskeleton__image}
        />
      </div>

      <div className={styles.productcardskeleton__content}>
        <div className={styles.productcardskeleton__detail_section}>
          <div className={styles.productcardskeleton__title_section}>
            <Skeleton variant="title" width="90%" height="20px" />
            <Skeleton variant="text" width="60%" height="14px" />
          </div>

          <div className={styles.productcardskeleton__price_section}>
            <Skeleton variant="price" width="40%" height="24px" />
            <Skeleton variant="text" width="70%" height="14px" />
          </div>

          <div className={styles.productcardskeleton__shipping_section}>
            <Skeleton variant="text" width="30%" height="14px" />
            <Skeleton variant="text" width="25%" height="14px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
