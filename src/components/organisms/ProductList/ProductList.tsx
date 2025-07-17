import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import React from 'react';
import styles from './ProductList.module.scss';
import { ProductListProps } from './ProductList.types';

const ProductList: React.FC<ProductListProps> = ({
  products,
  onProductClick,
  className = '',
}) => {
  if (!products || products.length === 0) {
    return (
      <div className={styles.productlist__empty}>
        <h2 className={styles.productlist__empty_title}>
          No se encontraron productos
        </h2>
        <p className={styles.productlist__empty_text}>
          Intenta con otros términos de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className={`${styles.productlist} ${className}`}>
      {products.map((product) => (
        <div key={product.id} className={styles.productlist__item}>
          <ProductCard product={product} onClick={onProductClick} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
