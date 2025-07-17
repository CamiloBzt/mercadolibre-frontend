import Skeleton from '@/components/atoms/Skeleton/Skeleton';
import React from 'react';
import styles from './ProductDetailSkeleton.module.scss';
import { ProductDetailSkeletonProps } from './ProductDetailSkeleton.types';

const ProductDetailSkeleton: React.FC<ProductDetailSkeletonProps> = ({
  className = '',
}) => {
  return (
    <article className={`${styles.productdetailskeleton} ${className}`}>
      <div className={styles.productdetailskeleton__content}>
        {/* Gallery Skeleton */}
        <div className={styles.productdetailskeleton__gallery}>
          <div className={styles.productdetailskeleton__thumbnails}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="image"
                width={48}
                height={48}
                className={styles.productdetailskeleton__thumbnail}
              />
            ))}
          </div>
          <div className={styles.productdetailskeleton__main_image}>
            <Skeleton variant="image" width="100%" height="100%" />
          </div>
        </div>

        {/* Info Skeleton */}
        <div className={styles.productdetailskeleton__info}>
          {/* Header */}
          <div className={styles.productdetailskeleton__header}>
            <Skeleton variant="text" width="80px" height="15px" />
            <Skeleton variant="text" width="100px" height="15px" />
          </div>

          {/* Title */}
          <div className={styles.productdetailskeleton__title}>
            <Skeleton variant="title" width="95%" height="22px" />
          </div>

          {/* Seller */}
          <div className={styles.productdetailskeleton__seller}>
            <Skeleton variant="text" width="60%" height="18px" />
          </div>

          {/* Price Section */}
          <div className={styles.productdetailskeleton__price_section}>
            <Skeleton variant="text" width="50%" height="18px" />
            <div className={styles.productdetailskeleton__price_wrapper}>
              <Skeleton variant="price" width="180px" height="36px" />
              <Skeleton variant="text" width="80px" height="20px" />
            </div>
            <Skeleton variant="text" width="75%" height="18px" />
          </div>

          {/* Shipping */}
          <div className={styles.productdetailskeleton__shipping}>
            <Skeleton variant="text" width="120px" height="18px" />
          </div>

          {/* Attributes */}
          <div className={styles.productdetailskeleton__attributes}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={styles.productdetailskeleton__attribute}
              >
                <Skeleton variant="text" width="80px" height="18px" />
                <Skeleton variant="text" width="120px" height="18px" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className={styles.productdetailskeleton__description}>
        <div className={styles.productdetailskeleton__description_header}>
          <Skeleton variant="title" width="120px" height="24px" />
          <div className={styles.productdetailskeleton__description_separator}>
            <Skeleton variant="text" width="100%" height="2px" />
          </div>
        </div>
        <div className={styles.productdetailskeleton__description_content}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="text"
              width={
                index === 0
                  ? '100%'
                  : index === 1
                    ? '95%'
                    : index === 2
                      ? '98%'
                      : index === 3
                        ? '92%'
                        : index === 4
                          ? '88%'
                          : '75%'
              }
              height="18px"
            />
          ))}
        </div>
      </section>
    </article>
  );
};

export default ProductDetailSkeleton;
