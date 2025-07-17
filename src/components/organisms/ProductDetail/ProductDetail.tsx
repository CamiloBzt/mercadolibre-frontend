import ImageGallery from '@/components/molecules/ImageGallery/ImageGallery';
import React from 'react';
import styles from './ProductDetail.module.scss';
import { ProductDetailProps } from './ProductDetail.types';
import { formatPrice } from '@/utils/formatPrice';

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  className = '',
}) => {
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

  const discount = calculateDiscount();

  return (
    <article className={`${styles.productdetail} ${className}`}>
      <div className={styles.productdetail__content}>
        <div className={styles.productdetail__gallery}>
          <ImageGallery images={product.pictures} title={product.title} />
        </div>

        <div className={styles.productdetail__info}>
          <div className={styles.productdetail__header}>
            <span className={styles.productdetail__condition}>
              {product.condition === 'new'
                ? 'Nuevo'
                : product.condition === 'used'
                  ? 'Usado'
                  : 'Reacondicionado'}
            </span>
            {product.sold_quantity > 0 && (
              <span className={styles.productdetail__sold}>
                +{product.sold_quantity} vendidos
              </span>
            )}
          </div>

          <h1 className={styles.productdetail__title}>{product.title}</h1>
          {product.seller && (
            <span className={styles.productdetail__seller}>
              Por {product.seller}
            </span>
          )}

          <div className={styles.productdetail__price_section}>
            {product.price.regular_amount && (
              <span className={styles.productdetail__price_regular}>
                {formatPrice(product.price.regular_amount)}
              </span>
            )}
            <div className={styles.productdetail__price_wrapper}>
              <span className={styles.productdetail__price}>
                {formatPrice(product.price.amount, product.price.decimals)}
              </span>
              {discount && (
                <span className={styles.productdetail__discount}>
                  {discount}% OFF
                </span>
              )}
            </div>
            {product.installments && (
              <p className={styles.productdetail__installments}>
                {product.installments}
              </p>
            )}
          </div>

          {product.free_shipping && (
            <p className={styles.productdetail__shipping}>Envío gratis</p>
          )}

          {product.attributes.map((attr) => (
            <div key={attr.id} className={styles.productdetail__attribute}>
              <dt className={styles.productdetail__attribute_name}>
                {attr.name}:
              </dt>
              <dd className={styles.productdetail__attribute_value}>
                {attr.value_name}
              </dd>
            </div>
          ))}
        </div>
      </div>

      {product.description && (
        <section className={styles.productdetail__description}>
          <div className={styles.productdetail__description_header}>
            <h2 className={styles.productdetail__description_header_title}>
              Descripción
            </h2>
            <div
              className={styles.productdetail__description_header_separator}
            />
          </div>
          <div className={styles.productdetail__description_content}>
            {product.description.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default ProductDetail;
