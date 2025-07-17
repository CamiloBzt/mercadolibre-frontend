import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './Logo.module.scss';
import { LogoProps } from './Logo.types';

const Logo: React.FC<LogoProps> = ({
  width = 134,
  height = 34,
  className = '',
}) => {
  return (
    <Link href="/" className={`${styles.logo} ${className}`}>
      <Image
        src="/assets/logo.webp"
        alt="MercadoLibre"
        width={width}
        height={height}
        priority
        className={styles.logo__image}
      />
    </Link>
  );
};

export default Logo;
