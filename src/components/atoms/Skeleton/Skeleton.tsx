import React from 'react';
import styles from './Skeleton.module.scss';
import { SkeletonProps } from './Skeleton.types';

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'text',
  className = '',
}) => {
  const style: React.CSSProperties = {};

  if (width) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }

  if (height) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }

  return (
    <div
      className={`${styles.skeleton} ${styles[`skeleton--${variant}`]} ${className}`}
      style={style}
      aria-label="Cargando..."
    />
  );
};

export default Skeleton;
