import Logo from '@/components/atoms/Logo/Logo';
import SearchBar from '@/components/molecules/SearchBar/SearchBar';
import React from 'react';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.types';

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Logo />
        <SearchBar
          placeholder="Buscar productos, marcas y más..."
          onSearch={onSearch}
        />
      </div>
    </header>
  );
};

export default Header;
