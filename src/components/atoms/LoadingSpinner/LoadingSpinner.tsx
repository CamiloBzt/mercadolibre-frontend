import React from 'react';
import styles from './LoadingSpinner.module.scss';
import { LoadingSpinnerProps } from './LoadingSpinner.types';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  className = '',
}) => {
  return (
    <div
      className={`${styles.loadingspinner} ${styles[`loadingspinner--${size}`]} ${className}`}
      role="status"
      aria-label="Cargando"
    >
      <div className={styles.loadingspinner__spinner}></div>
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

export default LoadingSpinner;
