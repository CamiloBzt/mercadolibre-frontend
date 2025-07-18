import { formatPrice } from '@/utils/formatPrice';
import { BLUR_DATA_URL, FALLBACK_IMAGE } from '@/constants/images';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './ProductCard.module.scss';
import { ProductCardProps } from './ProductCard.types';

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  priority = false,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(product.id);
    }
  };

  const calculateDiscount = () => {
    if (
      product.price.regular_amount &&
      product.price.regular_amount > product.price.amount
    ) {
      const discount = Math.round(
        ((product.price.regular_amount - product.price.amount) /
          product.price.regular_amount) *
          100
      );
      return discount;
    }
    return null;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = FALLBACK_IMAGE;
  };

  const discount = calculateDiscount();

  return (
    <Link
      href={`/items/${product.id}`}
      className={styles.productcard}
      onClick={handleClick}
    >
      <div className={styles.productcard__image}>
        <Image
          src={product.picture}
          alt={product.title}
          width={259}
          height={250}
          style={{ objectFit: 'contain' }}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          onError={handleImageError}
        />
      </div>

      <div className={styles.productcard__content}>
        <div className={styles.productcard__detail_section}>
          <div className={styles.productcard__title_section}>
            <h2 className={styles.productcard__title}>{product.title}</h2>
            {product.seller && (
              <span className={styles.productcard__seller}>
                Por {product.seller}
              </span>
            )}
          </div>
          <div className={styles.productcard__price}>
            <div
              className={styles.productcard__price_section}
              style={product.price.regular_amount ? { paddingTop: '1rem' } : {}}
            >
              {product.price.regular_amount && (
                <span className={styles.productcard__price__regular}>
                  {formatPrice(product.price.regular_amount)}
                </span>
              )}
              <h3 className={styles.productcard__price}>
                {formatPrice(product.price.amount, product.price.decimals)}
              </h3>
              {discount && (
                <span className={styles.productcard__price__discount}>
                  {discount}% OFF
                </span>
              )}
            </div>
            {product.installments && (
              <p className={styles.productcard__installments}>
                {product.installments}
              </p>
            )}
          </div>
          {product.free_shipping && (
            <p className={styles.productcard__shipping}>Envío gratis</p>
          )}
          <span className={styles.productcard__condition}>
            {product.condition}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
