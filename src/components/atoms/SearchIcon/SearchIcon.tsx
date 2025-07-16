import React from 'react';
import Image from 'next/image';
import { SearchIconProps } from './SearchIcon.types';
import styles from './SearchIcon.module.scss';

const SearchIcon: React.FC<SearchIconProps> = ({
  size = 18,
  className = '',
}) => {
  return (
    <div className={`${styles.searchicon} ${className}`}>
      <Image
        src="/assets/search.webp"
        alt="Buscar"
        width={size}
        height={size}
        className={styles.searchicon__image}
      />
    </div>
  );
};

export default SearchIcon;
