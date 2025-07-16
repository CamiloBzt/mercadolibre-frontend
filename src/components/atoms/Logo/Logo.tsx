import React from 'react';
import Image from 'next/image';
import { LogoProps } from './Logo.types';
import styles from './Logo.module.scss';

const Logo: React.FC<LogoProps> = ({
  width = 134,
  height = 34,
  className = '',
}) => {
  return (
    <div className={`${styles.logo} ${className}`}>
      <Image
        src="/assets/logo.webp"
        alt="MercadoLibre"
        width={width}
        height={height}
        priority
        className={styles.logo__image}
      />
    </div>
  );
};

export default Logo;
